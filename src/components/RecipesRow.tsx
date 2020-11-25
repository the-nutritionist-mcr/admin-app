import { Button, TableCell, TableRow } from "grommet";
import { useDispatch, useSelector } from "react-redux";

import OkCancelDialog from "./OkCancelDialog";
import React from "react";
import Recipe from "../domain/Recipe";

import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";
import { Trash } from "grommet-icons";

import { allExclusionsSelector } from "../features/exclusions/exclusionsSlice";
import { removeRecipe } from "../features/recipes/recipesSlice";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const dispatch = useDispatch();
  const exclusions = useSelector(allExclusionsSelector);

  return (
    <TableRow>
      <TableCell>
        <TableCellInputField
          thing={props.recipe}
          name="name"
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
          name="description"
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
          name="exclusions"
          thing={props.recipe}
          options={exclusions}
          labelKey="name"
          value={props.recipe.potentialExclusions}
          mutator={(newRecipe, item): void => {
            newRecipe.potentialExclusions = item.value;
          }}
          onChange={props.onChange}
        />
      </TableCell>

      <TableCell>
        <Button
          onClick={(): void => setShowDoDelete(true)}
          icon={<Trash color="light-6" />}
          a11yTitle="Delete"
        />
        <OkCancelDialog
          show={showDoDelete}
          header="Are you sure?"
          onOk={(): void => {
            dispatch(removeRecipe(props.recipe));
            setShowDoDelete(false);
          }}
          onCancel={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this recipe?
        </OkCancelDialog>
      </TableCell>
    </TableRow>
  );
};

export default RecipesRow;
