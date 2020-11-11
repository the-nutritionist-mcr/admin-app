import React from "react";
import Recipe from "../domain/Recipe";
import { allergens } from "../domain/Recipe";
import { deleteRecipe } from "../actions/recipes";
import { Table, CrossIcon, IconButton } from "evergreen-ui";
import TableCellInputField from "./TableCellInputField";
import MultiSelectField from "./MultiSelectField";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (oldRecipe: Recipe, newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => (
  <Table.Row>
    <Table.TextCell>
      <TableCellInputField
        thing={props.recipe}
        value={props.recipe.name}
        mutator={(newRecipe, event) => {
          newRecipe.name = event.target.value;
        }}
        onChange={props.onChange}
      />
    </Table.TextCell>
    <Table.TextCell>
      <TableCellInputField
        thing={props.recipe}
        value={props.recipe.description}
        mutator={(newRecipe, event) => {
          newRecipe.description = event.target.value;
        }}
        onChange={props.onChange}
      />
    </Table.TextCell>
    <Table.TextCell>
      <MultiSelectField
        thing={props.recipe}
        options={allergens}
        value={props.recipe.allergens}
        mutator={(newRecipe, item) => {
          newRecipe.allergens = [...newRecipe.allergens, item.value.toString()];
        }}
        onChange={props.onChange}
        remover={(newRecipe, itemToRemove) => {
          newRecipe.allergens = newRecipe.allergens.filter(
            (item) => item !== itemToRemove.value
          );
        }}
      />
    </Table.TextCell>

    <Table.TextCell>
      <IconButton
        intent="danger"
        onClick={() => deleteRecipe(props.recipe)}
        icon={CrossIcon}
        height={40}
      />
    </Table.TextCell>
  </Table.Row>
);

export default RecipesRow;
