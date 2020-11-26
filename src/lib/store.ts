import { combineReducers, configureStore } from "@reduxjs/toolkit";

import LoadingState from "../types/LoadingState";
import customersSlice from "../features/customers/customersSlice";
import exclusionsSlice from "../features/exclusions/exclusionsSlice";
import recipesSlice from "../features/recipes/recipesSlice";

const rootReducer = combineReducers({
  customers: customersSlice.reducer,
  recipes: recipesSlice.reducer,
  exclusions: exclusionsSlice.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export const loadingSelector = (state: AppState): LoadingState =>
  state.customers.loadingState;

export default store;
