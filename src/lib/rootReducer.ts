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

export const startLoading = createAction("startLoading");
export const loadingSucceeded = createAction("loadingSucceeded");
export const loadingFailed = createAction<Error>("loadingFailed");

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

  switch (action.type) {
    case startLoading.type:
      globalState.loadingState = LoadingState.Loading;
      break;
    case loadingSucceeded.type:
      globalState.loadingState = LoadingState.Succeeeded;
      break;
    case loadingFailed.type:
      globalState.loadingState;
      globalState.error = action.payload;
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

export default rootReducer;
