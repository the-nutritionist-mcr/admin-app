import {
  Form,
  Header,
  Heading,
  Box,
  FormField,
  Select,
  TextInput,
  DateInput,
  ThemeContext,
  TextArea,
  Button,
  Paragraph,
} from "grommet";
import React, { FC } from "react";
import { Prompt, RouteComponentProps } from "react-router-dom";
import {
  daysPerWeekOptions,
  plans,
  planLabels,
  extrasLabels,
  defaultDeliveryDays,
} from "../../lib/config";
import Customer, { Snack } from "../../domain/Customer";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import PlanPanel from "./PlanPanel";
import useExclusions from "../../features/exclusions/useExclusions";
import { makeNewPlan } from "./distribution-generator";
import useCustomers from "./useCustomers";
import { updateCustomer, createCustomer } from "./customersSlice";

import styled from "styled-components";

const StyledFormField = styled(FormField)`
  width: 300px;
`;

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
  const { customers } = useCustomers();

  const [customer, setCustomer] = React.useState<Customer>(defaultCustomer);
  const [dirty, setDirty] = React.useState(false);

  const isEdit = props.match.params.id;

  const [customerWasFound, setCustomerWasFound] = React.useState(false);

  React.useEffect(() => {
    const foundCustomer = customers.find(
      (thisCustomer) => thisCustomer.id === props.match.params.id
    );
    if (foundCustomer) {
      setCustomer(foundCustomer);
      setCustomerWasFound(true);
    }
  }, [customers, props.match.params.id]);

  const propsCustomer = {
    ...defaultCustomer,
    breakfast: false,
  };

  const { exclusions } = useExclusions();

  const dispatch = useDispatch();

  const onSubmit = debounce(async () => {
    const submittingCustomer = {
      ...customer,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      breakfast: (customer.breakfast as any) === "Yes",
    };

    const thunk = isEdit ? updateCustomer : createCustomer;
    await dispatch(thunk(submittingCustomer));
    setDirty(false);
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
      {(isEdit && customerWasFound) || !isEdit ? (
        <Form
          value={customer}
          onReset={(): void => {
            setCustomer(propsCustomer);
          }}
          onChange={onChange}
          onSubmit={onSubmit}
        >
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
          <Box direction="row" wrap={true} gap="3rem">
            <StyledFormField name="salutation" label="Salutation" required>
              <Select
                options={[
                  "Mr",
                  "Mrs",
                  "Miss",
                  "Ms",
                  "Mx",
                  "Master",
                  "Dr",
                  "Prof",
                  "Other",
                ]}
                name="salutation"
              />
            </StyledFormField>
            <StyledFormField name="firstName" label="First Name" required>
              <TextInput name="firstName" />
            </StyledFormField>

            <StyledFormField name="surname" label="Surname" required>
              <TextInput name="surname" />
            </StyledFormField>

            <StyledFormField name="paymentDayOfMonth" label="Payment Day ">
              <TextInput name="paymentDayOfMonth" type="number" />
            </StyledFormField>
            <StyledFormField name="startDate" label="Start Date">
              <DateInput name="startDate" format="dd/mm/yyyy" />
            </StyledFormField>
            <StyledFormField name="telephone" label="Telephone">
              <TextInput name="telephone" type="tel" />
            </StyledFormField>
            <StyledFormField name="email" label="Email" required>
              <TextInput name="email" type="email" />
            </StyledFormField>
          </Box>

          <Box direction="row" fill="horizontal" justify="stretch">
            <ThemeContext.Extend
              value={{
                formField: {
                  extend: `
                    flex-grow: 2
                    `,
                },
              }}
            >
              <StyledFormField
                name="address"
                label="Address"
                contentProps={{ fill: true }}
                required
              >
                <TextArea fill={true} name="address" />
              </StyledFormField>
            </ThemeContext.Extend>
          </Box>

          <Box direction="row" fill="horizontal" justify="stretch">
            <ThemeContext.Extend
              value={{
                formField: {
                  extend: `
                    flex-grow: 2
                    `,
                },
              }}
            >
              <StyledFormField
                name="notes"
                label="Notes"
                contentProps={{ fill: true }}
              >
                <TextArea fill={true} name="notes" />
              </StyledFormField>
            </ThemeContext.Extend>
          </Box>
          {isEdit && (
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
            }}
            exclusions={exclusions}
          />
        </Form>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default NewCustomerPage;
