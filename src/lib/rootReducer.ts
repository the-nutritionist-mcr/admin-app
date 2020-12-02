import { Reducer, createAction } from "@reduxjs/toolkit";

import customersSlice, {
  asyncActions as customersAsyncActions,
} from "../features/customers/customersSlice";

import LoadingState from "../types/LoadingState";

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

const loadingActions = new Set(
  [...customersAsyncActions].map((actionCreator) => actionCreator.pending.type)
);

const fulfilledActions = new Set(
  [...customersAsyncActions].map(
    (actionCreator) => actionCreator.fulfilled.type
  )
);

const rejectedActions = new Set(
  [...customersAsyncActions].map((actionCreator) => actionCreator.rejected.type)
);

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

  if (loadingActions.has(action.type)) {
    globalState.loadingState = LoadingState.Loading;
  }

  if (fulfilledActions.has(action.type)) {
    globalState.loadingState = LoadingState.Succeeeded;
  }

  if (rejectedActions.has(action.type)) {
    globalState.loadingState = LoadingState.Failed;
    globalState.error =
      typeof action.payload === "string"
        ? action.payload
        : action.error.message;
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
