import Plan from "../domain/Plan";

export type PlanCategory = "Mass" | "EQ" | "Micro" | "Ultra-Micro";

export const daysPerWeekOptions = [6, 5];

export const plans: Plan[] = [
  {
    category: "Mass",
    mealsPerDay: 1,
    costPerMeal: 902,
  },
  {
    category: "Mass",
    mealsPerDay: 2,
    costPerMeal: 885,
  },
  {
    category: "Mass",
    mealsPerDay: 3,
    costPerMeal: 885,
  },
  {
    category: "EQ",
    mealsPerDay: 1,
    costPerMeal: 787,
  },
  {
    category: "EQ",
    mealsPerDay: 2,
    costPerMeal: 760,
  },
  {
    category: "EQ",
    mealsPerDay: 3,
    costPerMeal: 760,
  },
  {
    category: "Micro",
    mealsPerDay: 1,
    costPerMeal: 673,
  },
  {
    category: "Micro",
    mealsPerDay: 2,
    costPerMeal: 663,
  },
  {
    category: "Micro",
    mealsPerDay: 3,
    costPerMeal: 663,
  },
  {
    category: "Ultra-Micro",
    mealsPerDay: 1,
    costPerMeal: 635,
  },
  {
    category: "Ultra-Micro",
    mealsPerDay: 2,
    costPerMeal: 625,
  },
  {
    category: "Ultra-Micro",
    mealsPerDay: 3,
    costPerMeal: 625,
  },
];
