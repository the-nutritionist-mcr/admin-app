import React from "react";
import Recipe from "../domain/Recipe";
import {
  CrossIcon,
  Button,
  Select,
  Heading,
  Paragraph,
  majorScale,
} from "evergreen-ui";
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
    savedPlanIds.map((id) =>
      id !== undefined ? recipeStore.getById(id) : undefined
    )
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
    return () => recipeStore.removeChangeListener(onChangeRecipes);
  }, []);

  const activeSelections = planned.filter(Boolean);

  return (
    <React.Fragment>
      <Heading is="h2" size={700} marginBottom={majorScale(2)}>
        Planner
      </Heading>
      <Paragraph>
        Planning for{" "}
        <Select
          value={day}
          marginBottom={majorScale(2)}
          onChange={(event) => {
            setDay(event.target.value as DeliveryDay);
            localStorage.setItem(LOCALSTORAGE_KEY_DAY, event.target.value);
          }}
        >
          <option>Monday</option>
          <option>Thursday</option>
        </Select>
      </Paragraph>
      <Paragraph>Select the meals for this delivery:</Paragraph>
      {planned.map((_plan, index) => (
        <Select
          value={planned[index]?.id || "None"}
          marginBottom={majorScale(2)}
          marginTop={majorScale(2)}
          marginRight={majorScale(1)}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const newPlanned = [...planned];
            newPlanned[index] = recipes.find(
              (recipe) => recipe.id === parseInt(event.target.value, 10)
            );
            localStorage.setItem(
              LOCALSTORAGE_KEY_PLANNED,
              JSON.stringify(newPlanned.map((item) => item?.id))
            );
            setPlanned(newPlanned);
          }}
        >
          <option value={0}>None</option>
          {recipes.map((recipe) => (
            <option value={recipe.id}>{recipe.name}</option>
          ))}
        </Select>
      ))}
      {activeSelections.length > 0 ? (
        <Button
          intent="danger"
          iconBefore={CrossIcon}
          onClick={() => {
            setPlanned(defaultPlans);
            localStorage.setItem(
              LOCALSTORAGE_KEY_PLANNED,
              JSON.stringify(defaultPlans)
            );
          }}
        >
          Clear Plan
        </Button>
      ) : null}
      {activeSelections.length === defaultPlans.length ? (
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
