import { Button, TableCell, TableRow } from "grommet";
import { Exclusion, Recipe } from "../models";
import { DataStore } from "@aws-amplify/datastore";
import OkCancelDialog from "./OkCancelDialog";
import React from "react";

import SimpleTableCellInputField from "./SimpleTableCellInputField";
import { Trash } from "grommet-icons";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);

  const [exclusions, setExclusions] = React.useState<Exclusion[]>([]);

  const loadExclusions = async (): Promise<void> => {
    const newExclusions = await DataStore.query(Exclusion);
    setExclusions([...newExclusions]);
  };

  React.useEffect(() => {
    const subscription = DataStore.observe(Exclusion).subscribe(loadExclusions);
    loadExclusions();
    return (): void => subscription.unsubscribe();
  }, [exclusions]);

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
            props.onChange(newRecipe);
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
            props.onChange(newRecipe);
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
