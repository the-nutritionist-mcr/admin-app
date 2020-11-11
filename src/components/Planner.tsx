import React from "react";
import Recipe from "../domain/Recipe";
import { Box, Button, Select, Heading, Paragraph } from "grommet";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import DeliveryDay from "../types/DeliveryDay";
import Customer from "../domain/Customer";
import ToCookTable from "./ToCookTable";
import ToPackTable from "./ToPackTable";
import recipeStore from "../stores/RecipeStore";
import customerStore from "../stores/CustomerStore";
import { getRecipes } from "../actions/recipes";
import { getCustomers } from "../actions/customers";
import { chooseMeals, makePlan } from "../lib/plan-meals";

const defaultPlans: DeliveryMealsSelection = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const LOCALSTORAGE_KEY_PLANNED = "TnmPlanned";
const LOCALSTORAGE_KEY_DAY = "TnmDay";

const Planner = () => {
  const savedPlanIds: (undefined | number)[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_PLANNED) ||
      JSON.stringify(defaultPlans)
  );

  const [day, setDay] = React.useState<DeliveryDay>(
    (localStorage.getItem(LOCALSTORAGE_KEY_DAY) as DeliveryDay) || "Monday"
  );

  const [planned, setPlanned] = React.useState<DeliveryMealsSelection>(
    defaultPlans
  );

  const [recipes, setRecipes] = React.useState<Recipe[]>(
    recipeStore.getRecipes()
  );

  const [customers, setCustomers] = React.useState<Customer[]>(
    customerStore.getCustomers()
  );

  const chosenMeals = chooseMeals(day, planned, customers);
  const cookPlan = makePlan(chosenMeals);

  const onChangeRecipes = () => {
    setRecipes([...recipeStore.getRecipes()]);
  };

  const onChangeCustomers = () => {
    setCustomers([...customerStore.getCustomers()]);
  };

  React.useEffect(() => {
    recipeStore.addChangeListener(onChangeRecipes);
    customerStore.addChangeListener(onChangeCustomers);
    getRecipes();
    getCustomers();
    setPlanned(
      savedPlanIds.map((id) =>
        id !== undefined ? recipeStore.getById(id) : undefined
      )
    );
    return () => recipeStore.removeChangeListener(onChangeRecipes);
  }, []);

  const activeSelections = planned.filter(Boolean);

  return (
    <React.Fragment>
      <Heading level={2}>Planner</Heading>
      <Paragraph>
        Planning for{" "}
        <Select
          options={["Select Day", "Monday", "Thursday"]}
          value={day}
          onChange={(event: { value: DeliveryDay }) => {
            setDay(event.value);
            localStorage.setItem(LOCALSTORAGE_KEY_DAY, event.value);
          }}
        />
      </Paragraph>
      <Paragraph>Select the meals for this delivery:</Paragraph>
      <Box direction="row" gap="medium">
        {planned.map((plan, index) => (
          <Select
            options={["None", ...recipes]}
            value={plan}
            labelKey={(labelPlan: undefined | Recipe) =>
              labelPlan?.name ?? "None"
            }
            children={(childPlan: undefined | Recipe) =>
              childPlan?.name ?? "None"
            }
            onChange={(event: { value: Recipe | undefined }) => {
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
        {activeSelections.length > 0 ? (
          <Button
            onClick={() => {
              setDay("Select Day");
              setPlanned(defaultPlans);
              localStorage.setItem(
                LOCALSTORAGE_KEY_PLANNED,
                JSON.stringify(defaultPlans)
              );
            }}
            label="Clear Plan"
          />
        ) : null}
      </Box>
      {activeSelections.length === defaultPlans.length &&
      day !== "Select Day" ? (
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
