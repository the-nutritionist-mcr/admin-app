import { PlanCategory } from "../lib/config";

export default interface Plan {
  mealsPerDay: number;
  costPerMeal: number;
  category: PlanCategory;
}
