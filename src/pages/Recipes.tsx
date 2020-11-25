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
  allRecipesSelector,
  createRecipe,
  updateRecipe,
} from "../features/recipes/recipesSlice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import RecipesRow from "../components/RecipesRow";

const Recipes: React.FC = () => {
  const recipes = useSelector(allRecipesSelector);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Recipes</Heading>
        <Button
          primary
          size="small"
          onClick={(): void => {
            dispatch(
              createRecipe({
                id: "0",
                name: "",
                potentialExclusions: [],
              })
            );
          }}
          label="New"
          a11yTitle="New Recipe"
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
            {recipes.map((recipe) => (
              <RecipesRow
                key={recipe.id}
                recipe={recipe}
                onChange={(newRecipe): void => {
                  dispatch(updateRecipe(newRecipe));
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
