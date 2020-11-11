import React from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from "grommet";
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
  }, []);

  return (
    <React.Fragment>
      <Heading level={2}>Recipes</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Allergens</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <RecipesRow recipe={recipe} onChange={updateRecipe} />
          ))}
        </TableBody>
      </Table>
      <Box direction="row" pad="medium">
        <Button
          primary
          size="large"
          onClick={createBlankRecipe}
          label="Create New"
        />
      </Box>
    </React.Fragment>
  );
};

export default Recipes;
