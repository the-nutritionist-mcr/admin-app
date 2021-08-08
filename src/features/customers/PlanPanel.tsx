import React, { FC } from "react";
import {
  Box,
  FormField,
  Select,
  Heading,
  CheckBoxGroup,
  Header,
  Button,
  Paragraph,
} from "grommet";
import MealDeliveriesTable from "./MealDeliveriesTable";
import { makeNewPlan } from "./distribution-generator";
import { PlannerConfig, DaysPerWeek, Delivery, CustomerPlan } from "./types";
import Exclusion from "../../domain/Exclusion";

interface PlanPanelProps {
  plannerConfig: PlannerConfig;
  exclusions: Exclusion[];
  onChange: (newCustomerPlan: CustomerPlan) => void;
}

const assertDaysPerWeek: (num: number) => asserts num is DaysPerWeek = (
  num
) => {
  if (num <= 0 || num > 7) {
    throw new Error(`${num} is not a valid DaysPerWeek value`);
  }
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PlanPanel: FC<PlanPanelProps> = (props) => {
  const [customDeliveryPlan, setCustomDeliveryPlan] = React.useState<
    Delivery[] | undefined
  >();

  const [customerPlan, setCustomerPlan] = React.useState<CustomerPlan>(
    makeNewPlan(props.plannerConfig)
  );

  return (
    <Box direction="column" gap="small">
      <Header justify="start" gap="small">
        <Heading level={3}>Customer Plan</Heading>
        {customDeliveryPlan ? (
          <Button
            label="Clear Custom Plan"
            onClick={() => setCustomDeliveryPlan(undefined)}
          />
        ) : null}
      </Header>
      <Box direction="row" gap="large">
        <FormField label="Days per week">
          <Select
            data-testid="daysPerWeek"
            options={["1", "2", "3", "4", "5", "6", "7"]}
            value={String(customerPlan.configuration.daysPerWeek)}
            disabled={Boolean(customDeliveryPlan)}
            onChange={(event) => {
              const value: number = Number.parseInt(event.value, 10);
              assertDaysPerWeek(value);
              setCustomerPlan(
                makeNewPlan(
                  props.plannerConfig,
                  { daysPerWeek: value },
                  customerPlan
                )
              );
            }}
          />
        </FormField>
        <FormField label="Meals per day">
          <Select
            data-testid="mealsPerDay"
            disabled={Boolean(customDeliveryPlan)}
            options={["1", "2", "3", "4"]}
            value={String(customerPlan.configuration.mealsPerDay)}
            onChange={(event) => {
              setCustomerPlan(
                makeNewPlan(
                  props.plannerConfig,
                  { mealsPerDay: Number.parseInt(event.value, 10) },
                  customerPlan
                )
              );
            }}
          />
        </FormField>
        <FormField label="Total Plans">
          <Select
            data-testid="totalPlans"
            options={["1", "2", "3", "4"]}
            value={String(customerPlan.configuration.totalPlans)}
            disabled={Boolean(customDeliveryPlan)}
            onChange={(event) => {
              setCustomerPlan(
                makeNewPlan(
                  props.plannerConfig,
                  { totalPlans: Number.parseInt(event.value, 10) },
                  customerPlan
                )
              );
            }}
          />
        </FormField>

        <FormField label="Plan Variant">
          <Select
            data-testid="planVariant"
            options={props.plannerConfig.planLabels}
            value={String(customerPlan.configuration.planType)}
            disabled={Boolean(customDeliveryPlan)}
            onChange={(event) => {
              setCustomerPlan(
                makeNewPlan(
                  props.plannerConfig,
                  { planType: event.value },
                  customerPlan
                )
              );
            }}
          />
        </FormField>
      </Box>

      <Box direction="row" gap="large">
        {props.plannerConfig.defaultDeliveryDays.map((defaultDay, index) => (
          <FormField
            key={`delivery-${defaultDay}-${index}`}
            label="Delivery One"
          >
            <Select
              data-testid={`delivery-${index}-select`}
              options={daysOfWeek}
              value={customerPlan.configuration.deliveryDays[index]}
              onChange={(event) => {
                const newDeliveryDays = [
                  ...customerPlan.configuration.deliveryDays,
                ];
                newDeliveryDays[index] = event.value;
                setCustomerPlan(
                  makeNewPlan(
                    props.plannerConfig,
                    { deliveryDays: newDeliveryDays },
                    customerPlan
                  )
                );
              }}
            />
          </FormField>
        ))}

        <FormField name="exclusions" label="Customisations">
          <Select
            multiple
            closeOnChange={false}
            name="exclusions"
            options={props.exclusions}
            labelKey="name"
            valueKey="name"
          />
        </FormField>
      </Box>
      <Box direction="row" gap="large">
        <CheckBoxGroup
          pad="medium"
          disabled={Boolean(customDeliveryPlan)}
          options={props.plannerConfig.extrasLabels}
          value={customerPlan.configuration.extrasChosen}
          // eslint-disable-next-line no-console
          onChange={(event) =>
            setCustomerPlan(
              makeNewPlan(
                props.plannerConfig,
                { extrasChosen: (event?.value ?? []) as string[] },
                customerPlan
              )
            )
          }
        />
      </Box>

      {customDeliveryPlan && (
        <Box direction="row" align="center">
          <Paragraph color="red" data-testid="summary" fill>
            This customer is on a <strong>custom plan</strong>. Click the above
            button to reset the plan to the default distribution.{" "}
          </Paragraph>
        </Box>
      )}
      <Heading level={3}>Meal Deliveries</Heading>
      <Box direction="row">
        <MealDeliveriesTable
          deliveries={customDeliveryPlan ?? customerPlan.deliveries}
          deliveryDays={customerPlan.configuration.deliveryDays}
          plannerConfig={props.plannerConfig}
          onChange={(deliveryPlan) => {
            setCustomDeliveryPlan(deliveryPlan);
          }}
        />
      </Box>
    </Box>
  );
};
export default PlanPanel;
