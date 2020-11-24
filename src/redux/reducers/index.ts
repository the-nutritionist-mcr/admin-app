import { combineReducers } from "@reduxjs/toolkit";
import customers from "./customers";
import recipes from "./recipes";

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({ customers, recipes });
