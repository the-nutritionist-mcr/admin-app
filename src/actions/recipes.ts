import dispatcher from "../appDispatcher";
import Recipe from "../domain/Recipe";

export enum ActionTypes {
  GetRecipes = "GetRecipe",
  CreateBlankRecipe = "CreateBlankRecipe",
  UpdateRecipe = "UpdateRecipe",
  DeleteRecipe = "DeleteRecipe",
}

const LOCALSTORAGE_KEY = "TnmRecipes";

type RecipeDispatchPayload = {
  actionTypes: ActionTypes;
  recipes: Recipe[];
};

export const getRecipes = () => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
  );

  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.GetRecipes,
    recipes,
  };

  dispatcher.dispatch(payload);
};

export const createBlankRecipe = () => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
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

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(recipes));
  dispatcher.dispatch(payload);
};

export const updateRecipe = (oldRecipe: Recipe, recipe: Recipe) => {
  const recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
  );

  const index = recipes.findIndex(
    (searchedRecipe) => searchedRecipe.id === oldRecipe.id
  );
  recipes[index] = recipe;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(recipes));

  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.UpdateRecipe,
    recipes,
  };

  dispatcher.dispatch(payload);
};

export const deleteRecipe = (recipe: Recipe) => {
  let recipes: Recipe[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
  );

  recipes = recipes.filter((searchedRecipe) => searchedRecipe.id !== recipe.id);

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(recipes));

  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.DeleteRecipe,
    recipes,
  };

  dispatcher.dispatch(payload);
};
