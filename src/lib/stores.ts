import ActionType from "../types/ActionType";
import Customer from "../domain/Customer";
import Recipe from "../domain/Recipe";
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
