import dispatcher, { DispatchPayload } from "../appDispatcher";
import ActionType from "../types/ActionType";
import { LOCALSTORAGE_KEY_RECIPES } from "../lib/constants";
import Recipe from "../domain/Recipe";

export const getRecipes = (): void => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) ?? "[]"
  );

  const payload: DispatchPayload = {
    actionType: ActionType.GetRecipes,
    data: recipes,
  };

  dispatcher.dispatch(payload);
};

export const createBlankRecipe = (): void => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) ?? "[]"
  );

  const blankRecipe: Recipe = {
    id: recipes.length > 0 ? recipes[recipes.length - 1].id + 1 : 1,
    name: "",
    allergens: [],
  };

  const payload: DispatchPayload = {
    actionType: ActionType.CreateBlankRecipe,
    data: recipes,
  };

  recipes.push(blankRecipe);

  localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));
  dispatcher.dispatch(payload);
};

export const updateRecipe = (oldRecipe: Recipe, recipe: Recipe): void => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) ?? "[]"
  );

  const index = recipes.findIndex(
    (searchedRecipe) => searchedRecipe.id === oldRecipe.id
  );
  recipes[index] = recipe;

  localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));

  const payload: DispatchPayload = {
    actionType: ActionType.UpdateRecipe,
    data: recipes,
  };

  dispatcher.dispatch(payload);
};

export const deleteRecipe = (recipe: Recipe): void => {
  // eslint-disable-next-line fp/no-let
  let recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) ?? "[]"
  );

  recipes = recipes.filter((searchedRecipe) => searchedRecipe.id !== recipe.id);

  localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));

  const payload: DispatchPayload = {
    actionType: ActionType.DeleteRecipe,
    data: recipes,
  };

  dispatcher.dispatch(payload);
};
