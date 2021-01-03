import CookPlan from "../types/CookPlan";
import Customer from "../domain/Customer";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryDay from "../types/DeliveryDay";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Recipe from "../domain/Recipe";
import isActive from "./isActive";

/* eslint-disable @typescript-eslint/no-magic-numbers */
const calculateMealsPerDeliveryFromMealsPerWeek = (
  mealsPerWeek: number,
  delivery: DeliveryDay
): number => {
  switch (mealsPerWeek) {
    case 5:
      return delivery === "Monday" ? 3 : 2;
    case 6:
      return 3;
    case 7:
      return delivery === "Monday" ? 3 : 4;
    case 10:
      return delivery === "Monday" ? 6 : 4;
    case 12:
      return 6;
    case 14:
      return delivery === "Monday" ? 6 : 8;
    case 15:
      return delivery === "Monday" ? 9 : 6;
    case 18:
      return 9;
    case 21:
      return delivery === "Monday" ? 9 : 12;
  }
  throw new Error(`${mealsPerWeek} meals per week is not currently supported`);
};
/* eslint-enable @typescript-eslint/no-magic-numbers */

const createNSizedUndefinedArray = (n: number): undefined[] => [
  ...new Array(n),
];

const getTotalMealCount = (customers: Customer[], delivery: DeliveryDay) =>
  customers.reduce<number>(
    (totalMeals, customer) =>
      totalMeals +
      calculateMealsPerDeliveryFromMealsPerWeek(
        customer.daysPerWeek * customer.plan.mealsPerDay,
        delivery
      ),
    0
  );

const generateMealSelection = (
  count: number,
  chosenPlans: Recipe[]
): Recipe[] =>
  createNSizedUndefinedArray(count).map(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (_value, index) => chosenPlans[index % chosenPlans.length]
  );

export const chooseMeals = (
  delivery: DeliveryDay,
  plans: DeliveryMealsSelection,
  customers: Customer[]
): CustomerMealsSelection => {
  type ExcludesUndefined = <T>(x: T | undefined) => x is T;

  const chosenPlans = plans.filter(Boolean) as Recipe[];
  const mealCount = getTotalMealCount(customers, delivery);
  const selection = generateMealSelection(mealCount, chosenPlans);
  const sortedCustomers = customers.slice().sort((a, b) =>
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    a.surname.toLowerCase() > b.surname.toLowerCase() ? 1 : -1
  );

  return sortedCustomers.filter(isActive).map((customer) => {
    const mealsPerWeek = customer.daysPerWeek * customer.plan.mealsPerDay;

    const mealsPerDelivery = calculateMealsPerDeliveryFromMealsPerWeek(
      mealsPerWeek,
      delivery
    );

    const meals = createNSizedUndefinedArray(mealsPerDelivery)
      .map(() => selection.shift())
      .filter((Boolean as unknown) as ExcludesUndefined);

    return {
      customer,
      meals,
    };
  });
};

export const createMealWithVariantString = (
  customer: Customer,
  meal: Recipe,
  allMeals: Recipe[]
): string =>
  `${meal.shortName}/${createVariantString(customer, meal, allMeals)}`;

export const createVariant = (
  customer: Customer,
  meal: Recipe,
  allMeals: Recipe[]
): { customisation: boolean; allergen: boolean; string: string } => {
  const realMeal = allMeals.find((theMeal) => theMeal.id === meal.id);
  const matchingExclusions = customer.exclusions.filter((allergen) => {
    return realMeal?.potentialExclusions.some(
      (value) => value.id === allergen.id
    );
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
  meal: Recipe,
  allMeals: Recipe[]
): string => {
  const realMeal = allMeals.find((theMeal) => theMeal.id === meal.id);
  // eslint-disable-next-line sonarjs/no-identical-functions
  const matchingExclusions = customer.exclusions.filter((allergen) => {
    return realMeal?.potentialExclusions.some(
      (value) => value.id === allergen.id
    );
  });

  return matchingExclusions.length > 0
    ? `${customer.plan.category} (${matchingExclusions
        .map((exclusion) => exclusion.name)
        .join(", ")})`
    : `${customer.plan.category}`;
};

export const makePlan = (
  chosenMeals: CustomerMealsSelection,
  allMeals: Recipe[]
): CookPlan => {
  const plan: CookPlan = [];
  chosenMeals.forEach((customerMealSelection) =>
    customerMealSelection.meals.forEach((meal) => {
      const existingRecipe = plan.find(
        (planItem) => planItem.recipe.id === meal.id
      );

      const mealVariant = createVariant(
        customerMealSelection.customer,
        meal,
        allMeals
      );

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
