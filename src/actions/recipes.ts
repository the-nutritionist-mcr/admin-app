import dispatcher, { DispatchPayload } from "../appDispatcher";
import ActionType from "../types/ActionType";
import { DataStore } from "@aws-amplify/datastore";
import { Recipe } from "../models";

// eslint-disable-next-line  import/prefer-default-export
export const getRecipes = async (): Promise<void> => {
  const recipes = await DataStore.query(Recipe);

  const payload: DispatchPayload = {
    actionType: ActionType.GetRecipes,
    data: recipes,
  };

  dispatcher.dispatch(payload);
};

// eslint-disable-next-line capitalized-comments
// export const createBlankRecipe = async (): Promise<void> => {
//   const recipe = new AwsRecipe({
//     name: "",
//     description: "",
//     potentialExclusions: [],
//   });

//   await DataStore.save(recipe);
//   await getRecipes();
// };

// export const updateRecipe = (oldRecipe: Recipe, recipe: Recipe): void => {
//   const recipes: Recipe[] = JSON.parse(
//     localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) ?? "[]"
//   );

//   const index = recipes.findIndex(
//     (searchedRecipe) => searchedRecipe.id === oldRecipe.id
//   );
//   recipes[index] = recipe;

//   localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));

//   const payload: DispatchPayload = {
//     actionType: ActionType.UpdateRecipe,
//     data: recipes,
//   };

//   dispatcher.dispatch(payload);
// };

// export const deleteRecipe = (recipe: Recipe): void => {
//   // eslint-disable-next-line fp/no-let
//   let recipes: Recipe[] = JSON.parse(
//     localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) ?? "[]"
//   );

//   recipes = recipes.filter((searchedRecipe) => searchedRecipe.id !== recipe.id);

//   localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));

//   const payload: DispatchPayload = {
//     actionType: ActionType.DeleteRecipe,
//     data: recipes,
//   };

//   dispatcher.dispatch(payload);
// };
