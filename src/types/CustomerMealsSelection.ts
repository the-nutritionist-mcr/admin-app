import { Customer, Recipe } from "../models";

type CustomerMealsSelection = { customer: Customer; meals: Recipe[] }[];

export default CustomerMealsSelection;
