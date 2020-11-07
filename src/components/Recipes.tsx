import React from "react";
import Recipe from "../domain/Recipe";
import recipeStore from "../stores/RecipeStore";
import RecipesRow from "./RecipesRow";

import {
  updateRecipe,
  getRecipes,
  createBlankRecipe,
} from "../actions/recipes";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>(
    recipeStore.getRecipes()
  );

  const onChangeRecipes = () => {
    setRecipes([...recipeStore.getRecipes()]);
  };

  React.useEffect(() => {
    recipeStore.addChangeListener(onChangeRecipes);
    if (recipeStore.getRecipes().length === 0) {
      getRecipes();
    }
    return () => recipeStore.removeChangeListener(onChangeRecipes);
  });

  return (
    <React.Fragment>
      <h2>Recipes</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Allergens</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <RecipesRow recipe={recipe} onChange={updateRecipe} />
          ))}
        </tbody>
      </table>
      <button onClick={createBlankRecipe}>Create New</button>
    </React.Fragment>
  );
};

export default Recipes;
