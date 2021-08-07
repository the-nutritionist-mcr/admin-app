import React, { FC } from "react";
import { Box, FormField, Select, Heading } from "grommet";
import { planLabels, extras, defaultDeliveryDays } from "../../lib/config";
import PlanTable from "./PlanTable";
import styled from "styled-components";

const ListItem = styled.li`
  margin: 1rem 0;
`;

const TAB_WIDTH = 2;

export interface CustomerPlan {
  deliveries: Delivery[];
}

export interface Item {
  name: string;
  quantity: number;
}

export interface Delivery {
  deliveryDay: string;
  items: Item[];
}

/* eslint-disable @typescript-eslint/no-magic-numbers */
const generatePlan = (
  daysPerWeek: number,
  mealsPerDay: number,
  totalPlans: number,
  mealSize: string
): CustomerPlan => {
  const defaultPlan: CustomerPlan = {
    deliveries: defaultDeliveryDays.map((day) => ({
      deliveryDay: day,
      items: [
        ...planLabels.map((label) => ({ name: label, quantity: 0 })),
        ...extras.map((extra) => ({ name: extra, quantity: 0 })),
      ],
    })),
  };

  return [...new Array(daysPerWeek)]
    .map(() => mealSize)
    .reduce<CustomerPlan>((accum, item, index) => {
      const found = accum.deliveries[index % 2].items.find(
        (foundItem) => foundItem.name === item
      );
      const perDay = mealsPerDay * totalPlans;
      if (found) {
        found.quantity += perDay;
      }
      return accum;
    }, defaultPlan);
};

/* eslint-enable @typescript-eslint/no-magic-numbers */

const PlanPanel: FC = () => {
  const [customPlan, setCustomPlan] = React.useState<
    CustomerPlan | undefined
  >();
  const [daysPerWeek, setDaysPerWeek] = React.useState(1);
  const [mealsPerDay, setMealsPerDay] = React.useState(1);
  const [totalPlans, setTotalPlans] = React.useState(1);
  const [mealSize, setMealSize] = React.useState(planLabels[0]);

  const defaultPlan = generatePlan(
    daysPerWeek,
    mealsPerDay,
    totalPlans,
    mealSize
  );

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(defaultPlan, null, TAB_WIDTH));
  return (
    <>
      <Box direction="row" gap="large">
        <FormField label="Days per week">
          <Select
            options={["1", "2", "3", "4", "5", "6", "7"]}
            value={String(daysPerWeek)}
            onChange={(event) => {
              setDaysPerWeek(Number.parseInt(event.value, 10));
              setCustomPlan(undefined);
            }}
          />
        </FormField>
        <FormField label="Meals per day">
          <Select
            options={["1", "2", "3", "4"]}
            value={String(mealsPerDay)}
            onChange={(event) => {
              setMealsPerDay(Number.parseInt(event.value, 10));
              setCustomPlan(undefined);
            }}
          />
        </FormField>
        <FormField label="Total Plans">
          <Select
            options={["1", "2", "3", "4"]}
            value={String(totalPlans)}
            onChange={(event) => {
              setTotalPlans(Number.parseInt(event.value, 10));
              setCustomPlan(undefined);
            }}
          />
        </FormField>

        <FormField label="Plan Variant">
          <Select
            options={planLabels}
            value={String(mealSize)}
            onChange={(event) => {
              setMealSize(event.value);
              setCustomPlan(undefined);
            }}
          />
        </FormField>
      </Box>
      <ul>
        <ListItem>
          {daysPerWeek} days x {mealsPerDay} meals x {totalPlans} plans ={" "}
          <strong>
            {daysPerWeek * mealsPerDay * totalPlans} meals per week
          </strong>
        </ListItem>
        {customPlan && (
          <ListItem>
            This customer is on a <strong>custom plan</strong>. If you make any
            further selections in the above boxes, the plan quantities will be
            reset back to the defaults.
          </ListItem>
        )}
      </ul>
      <Heading level={3}>Meal Deliveries</Heading>
      <Box direction="row">
        <PlanTable
          plan={customPlan ?? defaultPlan}
          onChange={(plan) => {
            setCustomPlan(plan);
          }}
        />
      </Box>
    </>
  );
};
export default PlanPanel;
