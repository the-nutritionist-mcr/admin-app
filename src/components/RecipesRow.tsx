import { Button, TableCell, TableRow } from "grommet";
import { DataStore } from "@aws-amplify/datastore";
import Exclusion from "../domain/Exclusion";
import OkCancelDialog from "./OkCancelDialog";
import React from "react";
import { Recipe } from "../models";

import SimpleTableCellInputField from "./SimpleTableCellInputField";
import { Trash } from "grommet-icons";
import { exclusionsStore } from "../lib/stores";
import { getExclusions } from "../actions/exclusions";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (oldRecipe: Recipe, newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);

  const [, setExclusions] = React.useState<Exclusion[]>(
    exclusionsStore.getAll()
  );

  const onChangeExclusions = (): void => {
    setExclusions([...exclusionsStore.getAll()]);
  };

  React.useEffect(() => {
    exclusionsStore.addChangeListener(onChangeExclusions);
    if (exclusionsStore.getAll().length === 0) {
      getExclusions();
    }
    return (): void => exclusionsStore.removeChangeListener(onChangeExclusions);
  }, []);

  return (
    <TableRow>
      <TableCell>
        <SimpleTableCellInputField
          value={props.recipe.name}
          name="name"
          onChange={(event): void => {
            const newRecipe = Recipe.copyOf(props.recipe, (updated) => {
              updated.name = event.target.value;
            });
            props.onChange(props.recipe, newRecipe);
          }}
        />
      </TableCell>
      <TableCell>
        <SimpleTableCellInputField
          value={props.recipe.description}
          name="description"
          onChange={(event): void => {
            const newRecipe = Recipe.copyOf(props.recipe, (updated) => {
              updated.description = event.target.value;
            });
            props.onChange(props.recipe, newRecipe);
          }}
        />
      </TableCell>
      <TableCell>(exclusions)</TableCell>
      <TableCell>
        <Button
          onClick={(): void => setShowDoDelete(true)}
          icon={<Trash color="brand" />}
          a11yTitle="Delete"
        />
        <OkCancelDialog
          show={showDoDelete}
          header="Are you sure?"
          onOk={async (): Promise<void> => {
            await DataStore.delete(props.recipe);
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
