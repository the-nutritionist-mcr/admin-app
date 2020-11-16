import {
  Button,
  Header,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
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
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Recipes</Heading>
        <Button
          primary
          size="small"
          onClick={createBlankRecipe}
          label="New"
          a11yTitle="New Customer"
        />
      </Header>
      {recipes.length > 0 ? (
        <Table alignSelf="start">
          <TableHeader>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Potential Exclusions</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              .sort((a: Recipe, b: Recipe) => (a.id > b.id ? -1 : 1))
              .map((recipe) => (
                <RecipesRow
                  key={recipe.id}
                  recipe={recipe}
                  onChange={updateRecipe}
                />
              ))}
          </TableBody>
        </Table>
      ) : (
        <Text>
          You&apos;ve not added any recipes yet... Click the &apos;new&apos;
          button above to get started!
        </Text>
      )}
    </React.Fragment>
  );
};

export default Recipes;
