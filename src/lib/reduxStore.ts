import { combineReducers, configureStore } from "@reduxjs/toolkit";

import customersSlice from "../features/customers/customersSlice";
import recipesSlice from "../features/recipes/recipesSlice";

const rootReducer = combineReducers({
  customers: customersSlice.reducer,
  recipes: recipesSlice.reducer,
});

const reduxStore = configureStore({
  reducer: rootReducer,
});

export default reduxStore;

export type AppState = ReturnType<typeof rootReducer>;
