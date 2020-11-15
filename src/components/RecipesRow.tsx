import { Button, TableCell, TableRow } from "grommet";
import Exclusion from "../domain/Exclusion";
import React from "react";
import Recipe from "../domain/Recipe";

import TableCellInputField from "./TableCellInputField";
import TableCellSelectField from "./TableCellSelectField";
import YesNoDialog from "./YesNoDialog";
import { deleteRecipe } from "../actions/recipes";
import { exclusionsStore } from "../lib/stores";
import { getExclusions } from "../actions/exclusions";
import useDeepCompareEffect from "use-deep-compare-effect";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (oldRecipe: Recipe, newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);

  const [exclusions, setExclusions] = React.useState<Exclusion[]>(
    exclusionsStore.getAll()
  );

  const onChangeExclusions = (): void => {
    setExclusions([...exclusionsStore.getAll()]);
  };

  useDeepCompareEffect(() => {
    exclusionsStore.addChangeListener(onChangeExclusions);
    if (exclusionsStore.getAll().length === 0) {
      getExclusions();
    }
    return (): void => exclusionsStore.removeChangeListener(onChangeExclusions);
  }, [exclusions]);

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
        <Button onClick={(): void => setShowDoDelete(true)} label="Delete" />
        <YesNoDialog
          show={showDoDelete}
          header="Are you sure?"
          onYes={(): void => {
            deleteRecipe(props.recipe);
            setShowDoDelete(false);
          }}
          onNo={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this recipe?
        </YesNoDialog>
      </TableCell>
    </TableRow>
  );
};

export default RecipesRow;
