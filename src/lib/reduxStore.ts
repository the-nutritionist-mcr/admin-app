import { combineReducers, configureStore } from "@reduxjs/toolkit";

import customersSlice from "../features/customers/customersSlice";

const rootReducer = combineReducers({ customers: customersSlice.reducer });

const reduxStore = configureStore({
  reducer: rootReducer,
});

export default reduxStore;

export type AppState = ReturnType<typeof rootReducer>;
