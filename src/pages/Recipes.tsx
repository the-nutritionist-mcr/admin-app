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

import { DataStore } from "@aws-amplify/datastore";
import React from "react";
import { Recipe } from "../models";
import RecipesRow from "../components/RecipesRow";

import { recipeStore } from "../lib/stores";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>(recipeStore.getAll());

  const loadRecipes = async (): Promise<void> => {
    const newRecipes = await DataStore.query(Recipe);
    setRecipes([...newRecipes]);
  };

  React.useEffect(() => {
    const subscription = DataStore.observe(Recipe).subscribe(loadRecipes);
    loadRecipes();
    return (): void => subscription.unsubscribe();
  }, []);

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Recipes</Heading>
        <Button
          primary
          size="small"
          onClick={async (): Promise<void> => {
            const newRecipe = new Recipe({
              name: "",
              description: "",
              potentialExclusions: [],
            });

            await DataStore.save(newRecipe);
          }}
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
                  onChange={async (updatedRecipe): Promise<void> => {
                    await DataStore.save(updatedRecipe);
                  }}
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
