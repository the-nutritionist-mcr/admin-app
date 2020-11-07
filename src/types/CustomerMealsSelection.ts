import Customer from "../domain/Customer";
import Recipe from "../domain/Recipe";

type CustomerMealsSelection = { customer: Customer; meals: Recipe[] }[];

export default CustomerMealsSelection;
