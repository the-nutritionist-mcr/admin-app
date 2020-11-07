import React from "react";
import Recipe from "../domain/Recipe";
import { allergens } from "../domain/Recipe";
import InputField from "./InputField";
import SelectField from "./SelectField";

interface RecipesRowProps {
  recipe: Recipe;
  onChange: (oldRecipe: Recipe, newRecipe: Recipe) => void;
}

const RecipesRow: React.FC<RecipesRowProps> = (props) => (
  <tr>
    <td>
      <InputField
        thing={props.recipe}
        value={props.recipe.name}
        mutator={(newRecipe, event) => {
          newRecipe.name = event.target.value;
        }}
        onChange={props.onChange}
      />
    </td>
    <td>
      <InputField
        thing={props.recipe}
        value={props.recipe.description}
        mutator={(newRecipe, event) => {
          newRecipe.description = event.target.value;
        }}
        onChange={props.onChange}
      />
    </td>
    <td>
      <SelectField
        multiple
        thing={props.recipe}
        options={allergens}
        value={props.recipe.allergens}
        mutator={(newRecipe, event) => {
          const selected = Array.from(event.target.options)
            .filter((item) => (item as HTMLOptionElement).selected)
            .map((item) => item.textContent ?? "")
            .filter(Boolean);
          newRecipe.allergens = selected;
        }}
        onChange={props.onChange}
      />
    </td>
  </tr>
);

export default RecipesRow;
