import Customer from "../domain/Customer";
import Recipe from "../domain/Recipe";

export interface SelectedMeal {
  recipe: Recipe;
  chosenVariant: string;
}

export interface SelectedExtra {
  chosenVariant: string;
}

export type SelectedItem = SelectedMeal | SelectedExtra;

export type Delivery = SelectedItem[] | string;

export type CustomerMealsSelection = {
  customer: Customer;
  deliveries: Delivery[];
}[];
