import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import CookPlan from "../types/CookPlan";
import Customer from "../domain/Customer";
import Recipe from "../domain/Recipe";
import DeliveryDay from "../types/DeliveryDay";

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

export const chooseMeals = (
  delivery: DeliveryDay,
  plans: DeliveryMealsSelection,
  customers: Customer[]
): CustomerMealsSelection => {
  const chosenPlans = plans.filter(Boolean) as Recipe[];
  return customers.map((customer) => ({
    customer,
    meals: [
      ...Array(
        getDeliveryMeals(
          customer.daysPerWeek * customer.plan.mealsPerDay,
          delivery
        )
      ),
    ]
      .map((_value, index) => chosenPlans[index % plans.length])
      .filter(Boolean),
  }));
};

export const createVariantString = (customer: Customer, meal: Recipe) => {
  const matchingAllergens = customer.allergicTo.filter((allergen) =>
    meal.allergens.includes(allergen)
  );

  if (matchingAllergens.length > 0) {
    return `${customer.plan.category} without ${matchingAllergens.join(", ")}`;
  } else {
    return `${customer.plan.category}`;
  }
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
      } else {
        if (existingRecipe.plan.hasOwnProperty(mealVariant)) {
          existingRecipe.plan[mealVariant]++;
        } else {
          existingRecipe.plan[mealVariant] = 1;
        }
      }
    })
  );
  return plan;
};
