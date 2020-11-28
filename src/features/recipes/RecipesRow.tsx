import { Button, TableCell, TableRow } from "grommet";
import { Edit, Trash } from "grommet-icons";
import { removeRecipe, updateRecipe } from "../recipes/recipesSlice";

import EditRecipesDialog from "./EditRecipesDialog";
import OkCancelDialog from "../../components/OkCancelDialog";
import React from "react";
import Recipe from "../../domain/Recipe";
import { useDispatch } from "react-redux";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell>{props.recipe.name}</TableCell>
      <TableCell>{props.recipe.description}</TableCell>
      <TableCell>
        {props.recipe.potentialExclusions.length > 0
          ? props.recipe.potentialExclusions
              .map((exclusion) => exclusion.name)
              .join(", ")
          : "None"}
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

        <Button
          secondary
          onClick={(): void => setShowEdit(true)}
          a11yTitle="Edit"
          icon={<Edit color="light-6" />}
        />
        {showEdit && (
          <EditRecipesDialog
            recipe={props.recipe}
            title="Edit Recipe"
            thunk={updateRecipe}
            onOk={(): void => {
              setShowEdit(false);
            }}
            onCancel={(): void => {
              setShowEdit(false);
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default RecipesRow;
