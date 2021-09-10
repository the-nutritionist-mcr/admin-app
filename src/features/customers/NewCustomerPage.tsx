import {
  Form,
  Header,
  Heading,
  Button,
  Paragraph,
} from "grommet";
import React, { FC } from "react";
import { ThunkDispatch } from "redux-thunk";
import { Prompt, RouteComponentProps, useHistory } from "react-router-dom";
import {
  daysPerWeekOptions,
  plans,
  planLabels,
  extrasLabels,
  defaultDeliveryDays,
} from "../../lib/config";
import Customer, { Snack } from "../../domain/Customer";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import PlanPanel from "./PlanPanel";
import { makeNewPlan } from "./distribution-generator";
import {
  updateCustomer,
  createCustomer,
  customerByIdSelector
} from "./customersSlice";

import { allExclusionsSelector } from "../exclusions/exclusionsSlice";
import AppState from "../../types/AppState";
import { AnyAction } from "redux";
import { OkCancelDialog } from "../../components";
import EditCustomerDetailsPanel from "./EditCustomerDetailsPanel";

const SUBMIT_DEBOUNCE = 500;

const defaultCustomer = {
  id: "0",
  firstName: "",
  surname: "",
  salutation: "",
  telephone: "",
  address: "",
  notes: "",
  email: "",
  daysPerWeek: daysPerWeekOptions[0],
  plan: plans[0],
  newPlan: makeNewPlan({
    planLabels: [...planLabels],
    extrasLabels: [...extrasLabels],
    defaultDeliveryDays,
  }),
  snack: Snack.None,
  breakfast: false,
  exclusions: [],
};

interface PathParams {
  id?: string;
}

const NewCustomerPage: FC<RouteComponentProps<PathParams>> = (props) => {
  const exclusions = useSelector(allExclusionsSelector);

  const idCustomer = useSelector(customerByIdSelector(props.match.params.id ?? ""));
  const isEdit = props.match.params.id;

  const [customer, setCustomer] = React.useState<Customer>(isEdit && idCustomer ? idCustomer : defaultCustomer);
  const [dirty, setDirty] = React.useState(false);
  const [planChanged, setPlanChanged] = React.useState(false);
  const [showPlanChangedDialog, setShowPlanChangedDialog] = React.useState(false);

  const propsCustomer = {
    ...defaultCustomer,
    breakfast: false,
  };

  const dispatch = useDispatch<ThunkDispatch<AppState, Customer, AnyAction>>();
  const history = useHistory();

  const onSubmit = debounce(async () => {
    const submittingCustomer = {
      ...customer,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      breakfast: (customer.breakfast as any) === "Yes",
    };

    const thunk = isEdit ? updateCustomer : createCustomer;
    await dispatch(thunk(submittingCustomer));
    setDirty(false);
    setPlanChanged(false);
    setShowPlanChangedDialog(false);
    history.push("/customers");
  }, SUBMIT_DEBOUNCE);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (nextCustomerData: any): void => {
    setDirty(true);
    const nextCustomer = {
      ...nextCustomerData,
      startDate:
        nextCustomerData.startDate === "string" && nextCustomerData.startDate
          ? new Date(nextCustomerData.startDate)
          : nextCustomerData.startDate,
      paymentDayOfMonth:
        nextCustomerData.paymentDayOfMonth === ""
          ? undefined
          : nextCustomerData.paymentDayOfMonth,
    };

    setCustomer(nextCustomer);
  };
  return (
    <>
      {" "}
      {(isEdit && customer) || !isEdit ? (
        <Form
          value={customer}
          onReset={(): void => {
            setCustomer(propsCustomer);
          }}
          onChange={onChange}
          onSubmit={planChanged && isEdit ? () => setShowPlanChangedDialog(true) : onSubmit}
        >
        <OkCancelDialog
        header="Plan Changed"
        onOk={onSubmit}
        show={showPlanChangedDialog}
        onCancel={() => setShowPlanChangedDialog(false)}
        >You have made an update to this Customer&apos;s plan. This will result in the meals they receive changing. Are you sure you want to do this?</OkCancelDialog>
          <Prompt
            when={dirty}
            message="You have unsaved changes. Are you sure you want to leave?"
          />
          <Header justify="start" gap="small">
            <Heading level={2}>
              {isEdit ? "Update Customer" : "New Customer"}
            </Heading>

            <Button
              primary
              disabled={!dirty}
              label="Save"
              type="submit"
              name="submit"
            />
          </Header>

          <Heading level={3}>Personal Details</Heading>
          <EditCustomerDetailsPanel />
          {isEdit && !customer.newPlan && (
            <>
              <Heading level={3}>Legacy Plan</Heading>
              <Paragraph fill>
                {customer.plan.category} {customer.plan.mealsPerDay} (
                {customer.daysPerWeek} days)
              </Paragraph>
            </>
          )}
          <PlanPanel
            plan={customer.newPlan}
            plannerConfig={{
              planLabels: [...planLabels],
              extrasLabels: [...extrasLabels],
              defaultDeliveryDays,
            }}
            onChange={(plan) => {
              onChange({ ...customer, newPlan: plan });
              setPlanChanged(true)
            }}
            exclusions={exclusions}
          />
        </Form>
      ) : null}
    </>
  );
};

export default NewCustomerPage;
