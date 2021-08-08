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
import PlanTable from "./PlanTable";
import { generateDistribution } from "./distribution-generator";
import { PlannerConfig, CustomerPlan } from "./types";

interface PlanPanelProps {
  plannerConfig: PlannerConfig;
}

const PlanPanel: FC<PlanPanelProps> = (props) => {
  const [customPlan, setCustomPlan] = React.useState<
    CustomerPlan | undefined
  >();
  const [daysPerWeek, setDaysPerWeek] = React.useState(1);
  const [mealsPerDay, setMealsPerDay] = React.useState(1);
  const [totalPlans, setTotalPlans] = React.useState(1);
  const [extrasChosen, setExtrasChosen] = React.useState<string[]>([]);
  const [mealSize, setMealSize] = React.useState(
    props.plannerConfig.planLabels[0]
  );

  const defaultPlan = generateDistribution(
    daysPerWeek,
    mealsPerDay,
    totalPlans,
    mealSize,
    extrasChosen,
    props.plannerConfig
  );

  return (
    <Box direction="column" gap="small">
      <Header justify="start" gap="small">
        <Heading level={3}>Customer Plan</Heading>
        {customPlan ? (
          <Button
            label="Clear Custom Plan"
            onClick={() => setCustomPlan(undefined)}
          />
        ) : null}
      </Header>
      <Box direction="row" gap="large">
        <FormField label="Days per week">
          <Select
            options={["1", "2", "3", "4", "5", "6", "7"]}
            value={String(daysPerWeek)}
            disabled={Boolean(customPlan)}
            onChange={(event) => {
              setDaysPerWeek(Number.parseInt(event.value, 10));
            }}
          />
        </FormField>
        <FormField label="Meals per day">
          <Select
            disabled={Boolean(customPlan)}
            options={["1", "2", "3", "4"]}
            value={String(mealsPerDay)}
            onChange={(event) => {
              setMealsPerDay(Number.parseInt(event.value, 10));
            }}
          />
        </FormField>
        <FormField label="Total Plans">
          <Select
            options={["1", "2", "3", "4"]}
            value={String(totalPlans)}
            disabled={Boolean(customPlan)}
            onChange={(event) => {
              setTotalPlans(Number.parseInt(event.value, 10));
            }}
          />
        </FormField>

        <FormField label="Plan Variant">
          <Select
            options={props.plannerConfig.planLabels}
            value={String(mealSize)}
            disabled={Boolean(customPlan)}
            onChange={(event) => {
              setMealSize(event.value);
            }}
          />
        </FormField>
      </Box>
      <Box direction="row" gap="large">
        <CheckBoxGroup
          pad="medium"
          disabled={Boolean(customPlan)}
          options={props.plannerConfig.extrasLabels}
          value={extrasChosen}
          // eslint-disable-next-line no-console
          onChange={(event) =>
            setExtrasChosen((event?.value ?? []) as string[])
          }
        />
      </Box>
      {!customPlan && (
        <Paragraph fill>
          {daysPerWeek} days x {mealsPerDay} meals x {totalPlans} plans ={" "}
          <strong>
            {daysPerWeek * mealsPerDay * totalPlans} meals per week
          </strong>
        </Paragraph>
      )}
      {customPlan && (
        <Paragraph fill>
          This customer is on a <strong>custom plan</strong>. Click the above
          button to reset the plan to the default distribution.{" "}
          <strong>
            Note: changes will not be stored in the database until you press the
            save button at the top of the page
          </strong>
        </Paragraph>
      )}
      <Heading level={3}>Meal Deliveries</Heading>
      <Box direction="row">
        <PlanTable
          plan={customPlan ?? defaultPlan}
          plannerConfig={props.plannerConfig}
          onChange={(plan) => {
            setCustomPlan(plan);
          }}
        />
      </Box>
    </Box>
  );
};
export default PlanPanel;
