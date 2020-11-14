import { Box, Button, Heading, Paragraph, Select } from "grommet";
import {
  LOCALSTORAGE_KEY_DAY,
  LOCALSTORAGE_KEY_PLANNED,
} from "../lib/constants";
import { chooseMeals, makePlan } from "../lib/plan-meals";
import { customerStore, recipeStore } from "../lib/stores";

import Customer from "../domain/Customer";
import DeliveryDay from "../types/DeliveryDay";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import React from "react";
import Recipe from "../domain/Recipe";
import ToCookTable from "../components/ToCookTable";
import ToPackTable from "../components/ToPackTable";

import { getCustomers } from "../actions/customers";
import { getRecipes } from "../actions/recipes";
import useDeepCompareEffect from "use-deep-compare-effect";

const defaultPlans: DeliveryMealsSelection = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const Planner: React.FC = () => {
  const savedPlanIds: (undefined | number)[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_PLANNED) ??
      JSON.stringify(defaultPlans)
  );

  const [day, setDay] = React.useState<DeliveryDay>(
    (localStorage.getItem(LOCALSTORAGE_KEY_DAY) as DeliveryDay) ?? ""
  );

  const [planned, setPlanned] = React.useState<DeliveryMealsSelection>(
    defaultPlans
  );

  const [recipes, setRecipes] = React.useState<Recipe[]>(recipeStore.getAll());

  const [customers, setCustomers] = React.useState<Customer[]>(
    customerStore.getAll()
  );

  const chosenMeals = chooseMeals(day, planned, customers);
  const cookPlan = makePlan(chosenMeals);

  const onChangeRecipes = (): void => {
    setRecipes([...recipeStore.getAll()]);
  };

  const onChangeCustomers = (): void => {
    setCustomers([...customerStore.getAll()]);
  };

  useDeepCompareEffect((): (() => void) => {
    recipeStore.addChangeListener(onChangeRecipes);
    customerStore.addChangeListener(onChangeCustomers);
    getRecipes();
    getCustomers();
    setPlanned(
      savedPlanIds.map((id) =>
        id !== undefined ? recipeStore.getById(id) : undefined
      )
    );
    return (): void => {
      recipeStore.removeChangeListener(onChangeRecipes);
      customerStore.removeChangeListener(onChangeCustomers);
    };
  }, [savedPlanIds]);

  const activeSelections = planned.filter(Boolean);

  return (
    <React.Fragment>
      <Heading level={2}>Planner</Heading>
      <Paragraph>
        Planning for{" "}
        <Select
          placeholder="Select Day"
          options={["", "Monday", "Thursday"]}
          value={day}
          onChange={(event: { value: DeliveryDay }): void => {
            setDay(event.value);
            localStorage.setItem(LOCALSTORAGE_KEY_DAY, event.value);
          }}
        />
      </Paragraph>
      <Paragraph>Select the meals for this delivery:</Paragraph>
      <Box direction="row" gap="medium">
        {planned.map((plan, index) => (
          <Select
            key={index}
            options={recipes}
            placeholder="None"
            value={plan ?? ""}
            labelKey={(labelPlan: undefined | Recipe): string | undefined =>
              labelPlan?.name
            }
            // eslint-disable-next-line react/no-children-prop
            children={(childPlan: undefined | Recipe): string =>
              childPlan?.name ?? "None"
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
      {activeSelections.length === defaultPlans.length && day !== "" ? (
        <React.Fragment>
          <ToCookTable plan={cookPlan} />
          <ToPackTable
            customerMeals={chosenMeals}
            deliveryMeals={defaultPlans}
          />
        </React.Fragment>
      ) : (
        <Paragraph>
          To calculate your delivery plan, please choose all{" "}
          {defaultPlans.length} recipes
        </Paragraph>
      )}
    </React.Fragment>
  );
};

export default Planner;
