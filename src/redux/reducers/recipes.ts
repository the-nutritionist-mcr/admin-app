import * as API from "../../API";

import { createCustomerAction, createReducer } from "@reduxjs/toolkit";

export type Recipes = Omit<
  Exclude<API.GetRecipeQuery["getRecipe"], null>,
  "__typename"
>;

interface RecipeState {
  recipes: Recipes[];
  page: number;
}

const initialState: RecipeState = {
  recipes: [],
  page: 0,
};

const createRecipe = createCustomerAction<Recipes, "create">("create");

const recipes = createReducer(initialState, (builder) =>
  builder.addCase(createRecipe, (state, action) => ({
    ...state,
    recipes: [...state.recipes, action.payload],
  }))
);

export default recipes;
