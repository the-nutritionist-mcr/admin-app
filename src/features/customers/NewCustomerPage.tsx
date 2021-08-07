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
import { Checkmark, Close } from "grommet-icons";
import React, { FC } from "react";
import { daysPerWeekOptions, plans } from "../../lib/config";
import { Snack } from "../../domain/Customer";
import { createCustomer } from "./customersSlice";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
// import { allExclusionsSelector } from "../../features/exclusions/exclusionsSlice";
import { loadingSelector } from "../../lib/rootReducer";
import LoadingState from "../../types/LoadingState";
import { Spinning } from "grommet-controls";
import PlanTable from "./PlanTable";

const SUBMIT_DEBOUNCE = 500;
const TAB_SIZE = 2;

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
  snack: Snack.None,
  breakfast: false,
  exclusions: [],
};

const NewCustomerPage: FC = () => {
  const [customer, setCustomer] = React.useState(defaultCustomer);

  const propsCustomer = {
    ...defaultCustomer,
    breakfast: false,
  };

  const dispatch = useDispatch();

  // const exclusions = useSelector(allExclusionsSelector);

  const isLoading = useSelector(loadingSelector) === LoadingState.Loading;

  const onSubmit = debounce(async (): Promise<void> => {
    const submittingCustomer = {
      ...customer,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      breakfast: (customer.breakfast as any) === "Yes",
    };
    await dispatch(createCustomer(submittingCustomer));
  }, SUBMIT_DEBOUNCE);
  return (
    <>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>New Customer</Heading>
      </Header>

      <Form
        value={customer}
        onReset={(): void => {
          setCustomer(propsCustomer);
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(nextCustomerData: any): void => {
          // eslint-disable-next-line no-console
          console.log(nextCustomerData);
          const nextCustomer = {
            ...nextCustomerData,
            startDate:
              nextCustomerData.startDate &&
              new Date(nextCustomerData.startDate),
            paymentDayOfMonth:
              nextCustomerData.paymentDayOfMonth === ""
                ? undefined
                : nextCustomerData.paymentDayOfMonth,
          };

          setCustomer(nextCustomer);
        }}
        onSubmit={onSubmit}
      >
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

        <Heading level={3}>Plan</Heading>
        <PlanTable
          onChange={(plan) => {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(plan, null, TAB_SIZE));
          }}
        />

        <Button
          icon={
            isLoading ? (
              <Spinning size="small" />
            ) : (
              <Checkmark size="small" color="brand" />
            )
          }
          disabled={isLoading}
          label="Ok"
          type="submit"
          name="submit"
        />
        <Button icon={<Close size="small" color="brand" />} label="Cancel" />
        <Button type="reset" name="reset" label="Reset" />
      </Form>
    </>
  );
};

export default NewCustomerPage;
