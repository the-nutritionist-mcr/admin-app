import { Box, Button, Heading, Paragraph, Select } from "grommet";
import { Customer, Recipe } from "../models";
import {
  LOCALSTORAGE_KEY_DAY,
  LOCALSTORAGE_KEY_PLANNED,
} from "../lib/constants";
import { chooseMeals, makePlan } from "../lib/plan-meals";

import { DataStore } from "@aws-amplify/datastore";
import DeliveryDay from "../types/DeliveryDay";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import React from "react";
import ToCookTable from "../components/ToCookTable";
import ToPackTable from "../components/ToPackTable";

import styled from "styled-components";
import useDeepCompareEffect from "use-deep-compare-effect";

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
  const savedPlanIds: (undefined | string)[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_PLANNED) ??
      JSON.stringify(defaultPlans)
  );

  const [day, setDay] = React.useState<DeliveryDay>(
    (localStorage.getItem(LOCALSTORAGE_KEY_DAY) as DeliveryDay) ?? ""
  );

  const [planned, setPlanned] = React.useState<DeliveryMealsSelection>(
    defaultPlans
  );

  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  const [customers, setCustomers] = React.useState<Customer[]>([]);

  const chosenMeals = chooseMeals(day, planned, customers);
  const cookPlan = makePlan(chosenMeals);

  const loadCustomers = async (): Promise<void> => {
    const newCustomers = await DataStore.query(Customer);
    setCustomers([...newCustomers]);
  };

  const loadRecipes = async (): Promise<void> => {
    const newRecipes = await DataStore.query(Recipe);
    setRecipes([...newRecipes]);
  };

  useDeepCompareEffect((): (() => void) => {
    const recipeSubscription = DataStore.observe(Recipe).subscribe(loadRecipes);
    const customersSubscription = DataStore.observe(Customer).subscribe(
      loadCustomers
    );
    loadCustomers();
    loadRecipes();
    (async (): Promise<void> => {
      setPlanned(
        await Promise.all(
          savedPlanIds.map((id) =>
            id !== undefined ? DataStore.query(Recipe, id) : undefined
          )
        )
      );
    })();
    return (): void => {
      recipeSubscription.unsubscribe();
      customersSubscription.unsubscribe();
    };
  }, [savedPlanIds]);

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
