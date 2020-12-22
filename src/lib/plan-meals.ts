import CookPlan from "../types/CookPlan";
import Customer from "../domain/Customer";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryDay from "../types/DeliveryDay";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Recipe from "../domain/Recipe";
import isActive from "./isActive";

/* eslint-disable @typescript-eslint/no-magic-numbers */
const getDeliveryMeals = (
  mealsPerDay: number,
  delivery: DeliveryDay
): number => {
  switch (mealsPerDay) {
    case 5:
      return delivery === "Monday" ? 3 : 2;
    case 6:
      return 3;
    case 10:
      return delivery === "Monday" ? 6 : 4;
    case 12:
      return 6;
    case 15:
      return delivery === "Monday" ? 9 : 6;
    case 18:
      return 9;
  }
  throw new Error(`${mealsPerDay} meals per week is not currently supported`);
};
/* eslint-enable @typescript-eslint/no-magic-numbers */

export const chooseMeals = (
  delivery: DeliveryDay,
  plans: DeliveryMealsSelection,
  customers: Customer[]
): CustomerMealsSelection => {
  const chosenPlans = plans.filter(Boolean) as Recipe[];
  return customers.filter(isActive).map((customer) => ({
    customer,
    meals: [
      ...new Array(
        getDeliveryMeals(
          customer.daysPerWeek * customer.plan.mealsPerDay,
          delivery
        )
      ),
    ]
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .map((_value, index) => chosenPlans[index % plans.length])
      .filter(Boolean),
  }));
};

export const createMealWithVariantString = (
  customer: Customer,
  meal: Recipe
): string => `${meal.shortName}/${createVariantString(customer, meal)}`;

export const createVariant = (
  customer: Customer,
  meal: Recipe
): { customisation: boolean; allergen: boolean; string: string } => {
  const matchingExclusions = customer.exclusions.filter((allergen) => {
    return meal.potentialExclusions.some((value) => value.id === allergen.id);
  });

  const string =
    matchingExclusions.length > 0
      ? `${customer.plan.category} (${matchingExclusions
          .map((exclusion) => exclusion.name)
          .join(", ")})`
      : `${customer.plan.category}`;

  return {
    customisation: matchingExclusions.length > 0,
    allergen: matchingExclusions.length > 0 && matchingExclusions[0].allergen,
    string,
  };
};

export const createVariantString = (
  customer: Customer,
  meal: Recipe
): string => {
  const matchingExclusions = customer.exclusions.filter((allergen) => {
    return meal.potentialExclusions.some((value) => value.id === allergen.id);
  });

  return matchingExclusions.length > 0
    ? `${customer.plan.category} (${matchingExclusions
        .map((exclusion) => exclusion.name)
        .join(", ")})`
    : `${customer.plan.category}`;
};

export const makePlan = (chosenMeals: CustomerMealsSelection): CookPlan => {
  const plan: CookPlan = [];
  chosenMeals.forEach((customerMealSelection) =>
    customerMealSelection.meals.forEach((meal) => {
      const existingRecipe = plan.find(
        (planItem) => planItem.recipe.id === meal.id
      );
      const mealVariant = createVariant(customerMealSelection.customer, meal);

      if (!existingRecipe) {
        plan.push({
          recipe: meal,
          plan: { [mealVariant.string]: { ...mealVariant, count: 1 } },
        });
      } else if (
        Object.prototype.hasOwnProperty.call(
          existingRecipe.plan,
          mealVariant.string
        )
      ) {
        existingRecipe.plan[mealVariant.string].count++;
      } else {
        existingRecipe.plan[mealVariant.string] = { ...mealVariant, count: 1 };
      }
    })
  );
  return plan;
};
