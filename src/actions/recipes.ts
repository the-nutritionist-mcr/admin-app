import dispatcher from "../appDispatcher";
import Recipe from "../domain/Recipe";

export enum ActionTypes {
  GetRecipes = "GetRecipe",
  CreateBlankRecipe = "CreateBlankRecipe",
  UpdateRecipe = "UpdateRecipe",
}

const recipes: Recipe[] = [];

type RecipeDispatchPayload = {
  actionTypes: ActionTypes;
  recipes: Recipe[];
};

export const getRecipes = () => {
  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.GetRecipes,
    recipes,
  };
  dispatcher.dispatch(payload);
};

export const createBlankRecipe = () => {
  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.CreateBlankRecipe,
    recipes: [
      {
        id: 0,
        name: "",
        allergens: [],
      },
    ],
  };
  dispatcher.dispatch(payload);
};

export const updateRecipe = (oldRecipe: Recipe, recipe: Recipe) => {
  const payload: RecipeDispatchPayload = {
    actionTypes: ActionTypes.UpdateRecipe,
    recipes: [oldRecipe, recipe],
  };

  dispatcher.dispatch(payload);
};
