import ActionType from "../types/ActionType";
import Customer from "../domain/Customer";
import Exclusion from "../domain/Exclusion";
import { Recipe } from "../models";
import Store from "./Store";
import appDispatcher from "../appDispatcher";

export const customerStore = new Store<Customer>(appDispatcher, (payload) => {
  switch (payload.actionType) {
    case ActionType.GetCustomers:
    case ActionType.CreateBlankCustomer:
    case ActionType.UpdateCustomer:
    case ActionType.DeleteCustomer:
      return payload.data as Customer[];
    default:
      return null;
  }
});

export const recipeStore = new Store<Recipe>(appDispatcher, (payload) => {
  switch (payload.actionType) {
    case ActionType.GetRecipes:
    case ActionType.CreateBlankRecipe:
    case ActionType.UpdateRecipe:
    case ActionType.DeleteRecipe:
      return payload.data as Recipe[];
    default:
      return null;
  }
});

export const exclusionsStore = new Store<Exclusion>(
  appDispatcher,
  (payload) => {
    switch (payload.actionType) {
      case ActionType.GetExclusions:
      case ActionType.CreateBlankExclusion:
      case ActionType.UpdateExclusion:
      case ActionType.DeleteExclusion:
        return payload.data as Exclusion[];
      default:
        return null;
    }
  }
);
