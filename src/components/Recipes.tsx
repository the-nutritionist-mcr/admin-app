import React from "react";
import Recipe from "../domain/Recipe";
import recipeStore from "../stores/RecipeStore";
import RecipesRow from "./RecipesRow";
import { majorScale, Table, Heading, Button } from "evergreen-ui";

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
  }, []);

  return (
    <React.Fragment>
      <Heading is="h2" size={700} marginBottom={majorScale(2)}>
        Recipes
      </Heading>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Description</Table.TextHeaderCell>
          <Table.TextHeaderCell>Allergens</Table.TextHeaderCell>
          <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {recipes.map((recipe) => (
            <RecipesRow recipe={recipe} onChange={updateRecipe} />
          ))}
        </Table.Body>
      </Table>
      <Button
        appearance="primary"
        marginTop={majorScale(2)}
        onClick={createBlankRecipe}
      >
        Create New
      </Button>
    </React.Fragment>
  );
};

export default Recipes;
