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
} from "grommet";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom"
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
  id?: string
}

const NewCustomerPage: FC<RouteComponentProps<PathParams>> = (props) => {
  const { customers } = useCustomers();

  const [customer, setCustomer] = React.useState<Customer>(defaultCustomer);
  const [dirty, setDirty] = React.useState(false);

  const [customerWasFound, setCustomerWasFound] = React.useState(false);

  React.useEffect(() => {
    const foundCustomer = customers.find(thisCustomer => thisCustomer.id === props.match.params.id)
    if (foundCustomer) {
      setCustomer(foundCustomer)
      setCustomerWasFound(true)
    }
  }, [customers, props.match.params.id])

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

    // eslint-disable-next-line no-console
    console.log(submittingCustomer);
    const thunk = props.match.params.id ? updateCustomer : createCustomer
    await dispatch(thunk(submittingCustomer));
    setDirty(false)
  }, SUBMIT_DEBOUNCE);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
const onChange = (nextCustomerData: any): void => {
          setDirty(true);
          const nextCustomer = {
            ...nextCustomerData,
            startDate:
              nextCustomerData.startDate === "string" && nextCustomerData.startDate ?
              new Date(nextCustomerData.startDate) : nextCustomerData.startDate,
              paymentDayOfMonth:
                nextCustomerData.paymentDayOfMonth === ""
                  ? undefined
                  : nextCustomerData.paymentDayOfMonth,
          };

          setCustomer(nextCustomer);
        }
  return (
    <> {(props.match.params.id && customerWasFound) || !props.match.params.id ? 
      <Form
        value={customer}
        onReset={(): void => {
          setCustomer(propsCustomer);
        }}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <Header justify="start" gap="small">
          <Heading level={2}>New Customer</Heading>

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
          <FormField name="salutation" label="Salutation" required>
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
          </FormField>
          <FormField name="firstName" label="First Name" required>
            <TextInput name="firstName" />
          </FormField>

          <FormField name="surname" label="Surname" required>
            <TextInput name="surname" />
          </FormField>

          <FormField name="paymentDayOfMonth" label="Payment Day ">
            <TextInput name="paymentDayOfMonth" type="number" />
          </FormField>
          <FormField name="startDate" label="Start Date">
            <DateInput name="startDate" format="dd/mm/yyyy" />
          </FormField>
          <FormField name="telephone" label="Telephone">
            <TextInput name="telephone" type="tel" />
          </FormField>
          <FormField name="email" label="Email" required>
            <TextInput name="email" type="email" />
          </FormField>
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
            <FormField
              name="address"
              label="Address"
              contentProps={{ fill: true }}
              required
            >
              <TextArea fill={true} name="address" />
            </FormField>
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
            <FormField name="notes" label="Notes" contentProps={{ fill: true }}>
              <TextArea fill={true} name="notes" />
            </FormField>
          </ThemeContext.Extend>
        </Box>
        <PlanPanel
          plan={customer.newPlan}
          plannerConfig={{
            planLabels: [...planLabels],
            extrasLabels: [...extrasLabels],
            defaultDeliveryDays,
          }}
          onChange={(plan) => {
            onChange({...customer, newPlan: plan})
          }}
          exclusions={exclusions}
        />
      </Form> : "Loading..."

}
    </>
  );
};

export default NewCustomerPage;
