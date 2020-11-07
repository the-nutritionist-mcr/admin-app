import React from "react";
import Recipe from "../domain/Recipe";
import { Select, Heading, Paragraph, majorScale } from "evergreen-ui";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Customer from "../domain/Customer";
import ToCookTable from "./ToCookTable";
import recipeStore from "../stores/RecipeStore";
import customerStore from "../stores/CustomerStore";
import { getRecipes } from "../actions/recipes";
import { getCustomers } from "../actions/customers";
import { chooseMeals, makePlan } from "../lib/plan-meals";

const plans: DeliveryMealsSelection = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const Planner = () => {
  const [planned, setPlanned] = React.useState<DeliveryMealsSelection>(plans);

  const [recipes, setRecipes] = React.useState<Recipe[]>(
    recipeStore.getRecipes()
  );

  const [customers, setCustomers] = React.useState<Customer[]>(
    customerStore.getCustomers()
  );

  const chosenMeals = chooseMeals("Monday", planned, customers);
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
    if (recipeStore.getRecipes().length === 0) {
      getRecipes();
    }
    if (customerStore.getCustomers().length === 0) {
      getCustomers();
    }
    return () => recipeStore.removeChangeListener(onChangeRecipes);
  }, []);

  return (
    <React.Fragment>
      <Heading is="h2" size={700} marginBottom={majorScale(2)}>
        Planner
      </Heading>
      <Paragraph>
        Planning for{" "}
        <Select marginBottom={majorScale(2)}>
          <option>Monday</option>
          <option>Thursday</option>
        </Select>
      </Paragraph>
      <Paragraph>Select the meals for this delivery:</Paragraph>
      {planned.map((_plan, index) => (
        <Select
          marginBottom={majorScale(2)}
          marginTop={majorScale(2)}
          marginRight={majorScale(1)}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const newPlanned = [...planned];
            newPlanned[index] = recipes.find(
              (recipe) => recipe.id === parseInt(event.target.value, 10)
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
      {cookPlan.length > 0 ? <ToCookTable plan={cookPlan} /> : null}

      <Heading
        is="h2"
        size={700}
        marginBottom={majorScale(2)}
        marginTop={majorScale(2)}
      >
        To Pack
      </Heading>
    </React.Fragment>
  );
};

export default Planner;
