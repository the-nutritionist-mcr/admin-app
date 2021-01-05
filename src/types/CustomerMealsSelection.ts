import Customer from "../domain/Customer";
import Recipe from "../domain/Recipe";

export interface Extras {
  breakfast: number;
  snack: number;
  largeSnack: number;
}

type CustomerMealsSelection = {
  customer: Customer;
  meals: Recipe[];
  extras: Extras;
}[];

export default CustomerMealsSelection;
