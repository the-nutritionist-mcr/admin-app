import dispatcher from "../appDispatcher";
import Recipe from "../domain/Recipe";
import { LOCALSTORAGE_KEY_RECIPES } from "../lib/constants";

export enum ActionTypes {
  GetRecipes = "GetRecipe",
  CreateBlankRecipe = "CreateBlankRecipe",
  UpdateRecipe = "UpdateRecipe",
  DeleteRecipe = "DeleteRecipe",
}

type RecipeDispatchPayload = {
  actionTypes: ActionTypes;
  recipes: Recipe[];
};

export const getRecipes = () => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) || "[]"
  );

  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.GetRecipes,
    recipes,
  };

  dispatcher.dispatch(payload);
};

export const createBlankRecipe = () => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) || "[]"
  );

  const blankRecipe: Recipe = {
    id: recipes.length > 0 ? recipes[recipes.length - 1].id + 1 : 1,
    name: "",
    allergens: [],
  };

  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.CreateBlankRecipe,
    recipes,
  };

  recipes.push(blankRecipe);

  localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));
  dispatcher.dispatch(payload);
};

export const updateRecipe = (oldRecipe: Recipe, recipe: Recipe) => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) || "[]"
  );

  const index = recipes.findIndex(
    (searchedRecipe) => searchedRecipe.id === oldRecipe.id
  );
  recipes[index] = recipe;

  localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));

  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.UpdateRecipe,
    recipes,
  };

  dispatcher.dispatch(payload);
};

export const deleteRecipe = (recipe: Recipe) => {
  let recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY_RECIPES) || "[]"
  );

  recipes = recipes.filter((searchedRecipe) => searchedRecipe.id !== recipe.id);

  localStorage.setItem(LOCALSTORAGE_KEY_RECIPES, JSON.stringify(recipes));

  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.DeleteRecipe,
    recipes,
  };

  dispatcher.dispatch(payload);
};
