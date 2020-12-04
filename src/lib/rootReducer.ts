import { Reducer, createAction } from "@reduxjs/toolkit";

import LoadingState from "../types/LoadingState";

import customersSlice from "../features/customers/customersSlice";
import exclusionsSlice from "../features/exclusions/exclusionsSlice";
import recipesSlice from "../features/recipes/recipesSlice";

export interface AppState {
  customers: ReturnType<typeof customersSlice.reducer>;
  exclusions: ReturnType<typeof exclusionsSlice.reducer>;
  recipes: ReturnType<typeof recipesSlice.reducer>;
  loadingState: LoadingState;
  error?: string;
}

const clearError = createAction("clearError");

interface GlobalState {
  loadingState: LoadingState;
  error?: string;
}

const rootReducer: Reducer<AppState> = (state, action) => {
  const customers = customersSlice.reducer(state?.customers, action);
  const exclusions = exclusionsSlice.reducer(state?.exclusions, action);
  const recipes = recipesSlice.reducer(state?.recipes, action);

  const globalState: GlobalState = {
    loadingState: LoadingState.Idle,
    error: undefined,
  };

  if (action.type === clearError.type) {
    globalState.error = undefined;
    globalState.loadingState = LoadingState.Idle;
  }

  return {
    customers,
    exclusions,
    recipes,
    ...globalState,
  };
};

export const loadingSelector = (state: AppState): LoadingState =>
  state.loadingState;

export const errorSelector = (state: AppState): string | undefined =>
  state.error;

export default rootReducer;
