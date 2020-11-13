import { Button, TableCell, TableRow } from "grommet";
import Recipe, { allergens } from "../domain/Recipe";
import React from "react";

import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";
import YesNoDialog from "./YesNoDialog";
import { deleteRecipe } from "../actions/recipes";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (oldRecipe: Recipe, newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  return (
    <TableRow>
      <TableCell>
        <TableCellInputField
          thing={props.recipe}
          value={props.recipe.name}
          mutator={(newRecipe, event): void => {
            newRecipe.name = event.target.value;
          }}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell>
        <TableCellInputField
          thing={props.recipe}
          value={props.recipe.description}
          mutator={(newRecipe, event): void => {
            newRecipe.description = event.target.value;
          }}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell>
        <TableCellSelectField
          multiple
          thing={props.recipe}
          options={allergens}
          value={props.recipe.allergens}
          mutator={(newRecipe, item): void => {
            newRecipe.allergens = item.value;
          }}
          onChange={props.onChange}
        />
      </TableCell>

      <TableCell>
        <Button onClick={(): void => setShowDoDelete(true)} label="Delete" />
        <YesNoDialog
          show={showDoDelete}
          header="Are you sure?"
          onYes={(): void => deleteRecipe(props.recipe)}
          onNo={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this recipe?
        </YesNoDialog>
      </TableCell>
    </TableRow>
  );
};

export default RecipesRow;
