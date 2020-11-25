import { Box, Button, Heading, Paragraph, Select } from "grommet";
import {
  LOCALSTORAGE_KEY_DAY,
  LOCALSTORAGE_KEY_PLANNED,
} from "../../lib/constants";
import { chooseMeals, makePlan } from "../../lib/plan-meals";

import DeliveryDay from "../../types/DeliveryDay";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import React from "react";
import Recipe from "../../domain/Recipe";
import ToCookTable from "./ToCookTable";
import ToPackTable from "./ToPackTable";
import { allCustomersSelector } from "../../features/customers/customersSlice";
import { allRecipesSelector } from "../../features/recipes/recipesSlice";
import styled from "styled-components";
import { useSelector } from "react-redux";

const defaultPlans: DeliveryMealsSelection = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const HiddenFromPrintBox = styled(Box)`
  @media print {
    display: none;
  }
`;

const PrintableBox = styled(Box)`
  @media print {
    display: block;
  }
`;

const Planner: React.FC = () => {
  const [day, setDay] = React.useState<DeliveryDay>(
    (localStorage.getItem(LOCALSTORAGE_KEY_DAY) as DeliveryDay) ?? ""
  );

  const [planned, setPlanned] = React.useState<DeliveryMealsSelection>(
    defaultPlans
  );

  const customers = useSelector(allCustomersSelector);
  const recipes = useSelector(allRecipesSelector);

  const chosenMeals = chooseMeals(day, planned, customers);
  const cookPlan = makePlan(chosenMeals);

  const activeSelections = planned.filter(Boolean);

  return (
    <React.Fragment>
      <Heading level={2}>Planner</Heading>
      <HiddenFromPrintBox>
        <Paragraph fill>
          Planning for{" "}
          <Select
            placeholder="Select Day"
            name="selectDay"
            options={["Monday", "Thursday"]}
            value={day}
            onChange={(event: { value: DeliveryDay }): void => {
              setDay(event.value);
              localStorage.setItem(LOCALSTORAGE_KEY_DAY, event.value);
            }}
          />
        </Paragraph>
        <Paragraph fill>Select the meals for this delivery:</Paragraph>
        <Box direction="row" gap="medium">
          {planned.map((plan, index) => (
            <Select
              key={index}
              name={`meal-${index}`}
              options={recipes}
              placeholder="None"
              value={plan ?? ""}
              labelKey={(labelPlan: undefined | Recipe): string | undefined =>
                labelPlan?.name
              }
              onChange={(event: { value: Recipe | undefined }): void => {
                const newPlanned = [...planned];
                newPlanned[index] = recipes.find(
                  (recipe) => recipe.id === event?.value?.id
                );
                localStorage.setItem(
                  LOCALSTORAGE_KEY_PLANNED,
                  JSON.stringify(newPlanned.map((item) => item?.id))
                );
                setPlanned(newPlanned);
              }}
            />
          ))}
          {activeSelections.length > 0 || day !== "" ? (
            <Button
              onClick={(): void => {
                setDay("");
                setPlanned(defaultPlans);
                localStorage.setItem(
                  LOCALSTORAGE_KEY_PLANNED,
                  JSON.stringify(defaultPlans)
                );
              }}
              label="Clear"
            />
          ) : null}
        </Box>
      </HiddenFromPrintBox>
      <PrintableBox>
        {activeSelections.length === defaultPlans.length && day !== "" ? (
          <React.Fragment>
            <ToCookTable plan={cookPlan} />
            <ToPackTable
              customerMeals={chosenMeals}
              deliveryMeals={defaultPlans}
            />
          </React.Fragment>
        ) : (
          <Paragraph fill>
            To calculate your delivery plan, please choose all{" "}
            {defaultPlans.length} recipes
          </Paragraph>
        )}
      </PrintableBox>
    </React.Fragment>
  );
};

export default Planner;
