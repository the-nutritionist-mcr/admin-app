import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
