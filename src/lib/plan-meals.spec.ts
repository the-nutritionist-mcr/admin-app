import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import Recipe from "../domain/Recipe";
import Customer, { Snack } from "../domain/Customer";
import DeliveryDay from "../types/DeliveryDay";
import { mock as mockExtended } from "jest-mock-extended";

import * as planMeals from "./plan-meals";

describe("chooseMeals", () => {
  it("returns an empty array if there are no customers", () => {
    const mealsSelection: DeliveryMealsSelection = [
      {
        id: 1,
        name: "foo",
        allergens: ["fish", "rice"],
      },
      {
        id: 2,
        name: "bar",
        allergens: [],
      },
    ];

    const actual = planMeals.chooseMeals("Monday", mealsSelection, []);

    expect(actual).toBeInstanceOf(Array);
    expect(actual).toHaveLength(0);
  });

  it.each([
    [9, "Monday", 3, 6],
    [9, "Monday", 3, 5],
    [6, "Monday", 2, 6],
    [6, "Monday", 2, 5],
    [3, "Monday", 1, 5],
    [3, "Monday", 1, 6],
    [9, "Thursday", 3, 6],
    [6, "Thursday", 3, 5],
    [6, "Thursday", 2, 6],
    [4, "Thursday", 2, 5],
    [3, "Thursday", 1, 6],
    [2, "Thursday", 1, 5],
  ])(
    "plans %d meals per %s delivery for customers on %d meals/%d day plans",
    (meals: number, day: string, mealsPerDay: number, daysPerWeek: number) => {
      const mealOne = mockExtended<Recipe>();
      const mealTwo = mockExtended<Recipe>();
      const mealThree = mockExtended<Recipe>();
      const mealFour = mockExtended<Recipe>();
      const mealFive = mockExtended<Recipe>();
      const mealSix = mockExtended<Recipe>();

      const mealsSelection: DeliveryMealsSelection = [
        mealOne,
        mealTwo,
        mealThree,
        mealFour,
        mealFive,
        mealSix,
      ];

      const customerOne: Customer = {
        id: 1,
        name: "foo-customer",
        email: "foo-email",
        daysPerWeek: 6,
        snack: Snack.None,
        breakfast: false,
        plan: {
          category: "Mass",
          mealsPerDay: 2,
          costPerMeal: 885,
        },
        allergicTo: [],
      };

      const customerTwo: Customer = {
        id: 2,
        name: "bar-customer",
        email: "bar-email",
        daysPerWeek,
        snack: Snack.None,
        breakfast: true,
        plan: {
          category: "Mass",
          mealsPerDay,
          costPerMeal: 885,
        },
        allergicTo: ["Fish"],
      };

      const customerThree: Customer = {
        id: 3,
        name: "baz-customer",
        email: "baz-email",
        daysPerWeek: 6,
        snack: Snack.None,
        breakfast: true,
        plan: {
          category: "Mass",
          mealsPerDay: 2,
          costPerMeal: 885,
        },
        allergicTo: ["Fish"],
      };

      const customers = [customerOne, customerTwo, customerThree];

      const actual = planMeals.chooseMeals(
        day as DeliveryDay,
        mealsSelection,
        customers
      );

      expect(actual[1].customer).toEqual(customerTwo);
      expect(actual[1].meals).toHaveLength(meals);

      [...Array(meals)].forEach((_item, index) => {
        expect(actual[1].meals[index]).toBe(
          mealsSelection[index % mealsSelection.length]
        );
      });

      expect(actual[2].customer).toEqual(customerThree);
      expect(actual[2].meals).toHaveLength(6);
      expect(actual[2].meals[0]).toBe(mealOne);
      expect(actual[2].meals[1]).toBe(mealTwo);
      expect(actual[2].meals[2]).toBe(mealThree);
      expect(actual[2].meals[3]).toBe(mealFour);
      expect(actual[2].meals[4]).toBe(mealFive);
      expect(actual[2].meals[5]).toBe(mealSix);
    }
  );
});

describe("makePlan", () => {
  it("Returns an empty array if there is nothing in the cookplan", () => {
    const actual = planMeals.makePlan([]);
    expect(actual).toBeInstanceOf(Array);
    expect(actual).toHaveLength(0);
  });

  it("Collects together all recipes correctly when there is no variants and there is only one type of meal", () => {
    const recipeOne: Recipe = {
      id: 0,
      name: "foo-recipe",
      allergens: [],
    };

    const recipeTwo: Recipe = {
      id: 1,
      name: "bar-recipe",
      allergens: [],
    };

    const recipeThree: Recipe = {
      id: 2,
      name: "baz-recipe",
      allergens: [],
    };

    const plan: CustomerMealsSelection = [
      {
        meals: [recipeOne, recipeTwo],
        customer: {
          id: 0,
          name: "foo",
          email: "foo-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          allergicTo: [],
        },
      },
      {
        meals: [recipeOne],
        customer: {
          id: 1,
          name: "foo1",
          email: "foo1-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          allergicTo: [],
        },
      },
      {
        meals: [recipeOne, recipeTwo, recipeThree],
        customer: {
          id: 2,
          name: "foo2",
          email: "foo2-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          allergicTo: [],
        },
      },
    ];

    const actual = planMeals.makePlan(plan);

    expect(actual).toHaveLength(3);

    const firstPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeOne.name
    );

    expect(firstPlan?.plan["Mass"]).toEqual(3);

    const secondPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeTwo.name
    );

    expect(secondPlan?.plan["Mass"]).toEqual(2);

    const thirdPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeThree.name
    );

    expect(thirdPlan?.plan["Mass"]).toEqual(1);
  });

  it("Groups matching allergens together as a 'variant'", () => {
    const recipeOne: Recipe = {
      id: 0,
      name: "foo-recipe",
      allergens: ["fish"],
    };

    const recipeTwo: Recipe = {
      id: 1,
      name: "bar-recipe",
      allergens: [],
    };

    const recipeThree: Recipe = {
      id: 2,
      name: "baz-recipe",
      allergens: [],
    };

    const plan: CustomerMealsSelection = [
      {
        meals: [recipeOne, recipeTwo],
        customer: {
          id: 0,
          name: "foo",
          email: "foo-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          allergicTo: [],
        },
      },
      {
        meals: [recipeOne],
        customer: {
          id: 1,
          name: "foo1",
          email: "foo1-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          allergicTo: ["fish"],
        },
      },
      {
        meals: [recipeOne, recipeTwo, recipeThree],
        customer: {
          id: 2,
          name: "foo2",
          email: "foo2-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          allergicTo: [],
        },
      },
    ];

    const actual = planMeals.makePlan(plan);

    expect(actual).toHaveLength(3);

    const firstPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeOne.name
    );

    expect(firstPlan?.plan["Mass"]).toEqual(2);
    expect(firstPlan?.plan["Mass without fish"]).toEqual(1);
  });
});
