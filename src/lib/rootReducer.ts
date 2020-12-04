import {
  clearError,
  loadingFailed,
  loadingStart,
  loadingSucceeded,
} from "./apiRequestCreator";

import LoadingState from "../types/LoadingState";
import { Reducer } from "@reduxjs/toolkit";

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

const rootReducer: Reducer<AppState> = (state, action): AppState => {
  const customers = customersSlice.reducer(state?.customers, action);
  const exclusions = exclusionsSlice.reducer(state?.exclusions, action);
  const recipes = recipesSlice.reducer(state?.recipes, action);

  const newState: AppState = {
    ...state,
    customers,
    exclusions,
    recipes,
    loadingState: LoadingState.Idle,
  };

  switch (action.type) {
    case loadingStart.type:
      newState.loadingState = LoadingState.Loading;
      break;

    case loadingSucceeded.type:
      newState.loadingState = LoadingState.Succeeeded;
      break;

    case loadingFailed.type:
      newState.loadingState = LoadingState.Failed;
      newState.error = action.payload.message;
      break;

    case clearError.type:
      newState.loadingState = LoadingState.Idle;
      newState.error = undefined;
  }

  return newState;
};

export const loadingSelector = (state: AppState): LoadingState =>
  state.loadingState;

export const errorSelector = (state: AppState): string | undefined =>
  state.error;

export default rootReducer;
