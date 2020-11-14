import {
  Box,
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

import {
  createBlankRecipe,
  getRecipes,
  updateRecipe,
} from "../actions/recipes";
import React from "react";
import Recipe from "../domain/Recipe";
import RecipesRow from "../components/RecipesRow";
import { recipeStore } from "../lib/stores";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>(recipeStore.getAll());

  const onChangeRecipes = (): void => {
    setRecipes([...recipeStore.getAll()]);
  };

  React.useEffect(() => {
    recipeStore.addChangeListener(onChangeRecipes);
    if (recipeStore.getAll().length === 0) {
      getRecipes();
    }
    return (): void => recipeStore.removeChangeListener(onChangeRecipes);
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
            <RecipesRow
              key={recipe.id}
              recipe={recipe}
              onChange={updateRecipe}
            />
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
