import CookPlan from "../types/CookPlan";
import Customer from "../domain/Customer";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryDay from "../types/DeliveryDay";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Recipe from "../domain/Recipe";

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
  return 0;
};
/* eslint-enable @typescript-eslint/no-magic-numbers */

export const chooseMeals = (
  delivery: DeliveryDay,
  plans: DeliveryMealsSelection,
  customers: Customer[]
): CustomerMealsSelection => {
  const chosenPlans = plans.filter(Boolean) as Recipe[];
  return customers.map((customer) => ({
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

export const createVariantString = (
  customer: Customer,
  meal: Recipe
): string => {
  const matchingAllergens = customer.allergicTo.filter((allergen) =>
    meal.allergens.includes(allergen)
  );

  return matchingAllergens.length > 0
    ? `${customer.plan.category} without ${matchingAllergens.join(", ")}`
    : `${customer.plan.category}`;
};

export const makePlan = (chosenMeals: CustomerMealsSelection): CookPlan => {
  const plan: CookPlan = [];
  chosenMeals.forEach((customerMealSelection) =>
    customerMealSelection.meals.forEach((meal) => {
      const existingRecipe = plan.find((planItem) => planItem.recipe === meal);
      const mealVariant = createVariantString(
        customerMealSelection.customer,
        meal
      );
      if (!existingRecipe) {
        plan.push({
          recipe: meal,
          plan: { [mealVariant]: 1 },
        });
      } else if (Object.prototype.hasOwnProperty.call(plan, mealVariant)) {
        existingRecipe.plan[mealVariant]++;
      } else {
        existingRecipe.plan[mealVariant] = 1;
      }
    })
  );
  return plan;
};
