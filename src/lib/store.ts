import { combineReducers, configureStore } from "@reduxjs/toolkit";

import customersSlice from "../features/customers/customersSlice";
import exclusionsSlice from "../features/exclusions/exclusionsSlice";
import persistState from "redux-localstorage";
import recipesSlice from "../features/recipes/recipesSlice";

const rootReducer = combineReducers({
  customers: customersSlice.reducer,
  recipes: recipesSlice.reducer,
  exclusions: exclusionsSlice.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = configureStore({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enhancers: [persistState() as any],
  reducer: rootReducer,
});

export default store;
