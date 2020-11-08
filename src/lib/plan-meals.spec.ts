import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import Recipe from "../domain/Recipe";
import Customer, { Snack } from "../domain/Customer";
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

  it("plans 6 meals in the delivery for customers on a two meal per 6 day plan on Mondays", () => {
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

    const actual = planMeals.chooseMeals("Monday", mealsSelection, customers);

    expect(actual[0].customer).toEqual(customerOne);
    expect(actual[0].meals).toHaveLength(6);
    expect(actual[0].meals[0]).toBe(mealOne);
    expect(actual[0].meals[1]).toBe(mealTwo);
    expect(actual[0].meals[2]).toBe(mealThree);
    expect(actual[0].meals[3]).toBe(mealFour);
    expect(actual[0].meals[4]).toBe(mealFive);
    expect(actual[0].meals[5]).toBe(mealSix);

    expect(actual[1].customer).toEqual(customerTwo);
    expect(actual[1].meals).toHaveLength(6);
    expect(actual[1].meals[0]).toBe(mealOne);
    expect(actual[1].meals[1]).toBe(mealTwo);
    expect(actual[1].meals[2]).toBe(mealThree);
    expect(actual[1].meals[3]).toBe(mealFour);
    expect(actual[1].meals[4]).toBe(mealFive);
    expect(actual[1].meals[5]).toBe(mealSix);

    expect(actual[2].customer).toEqual(customerThree);
    expect(actual[2].meals).toHaveLength(6);
    expect(actual[2].meals[0]).toBe(mealOne);
    expect(actual[2].meals[1]).toBe(mealTwo);
    expect(actual[2].meals[2]).toBe(mealThree);
    expect(actual[2].meals[3]).toBe(mealFour);
    expect(actual[2].meals[4]).toBe(mealFive);
    expect(actual[2].meals[5]).toBe(mealSix);
  });

  it("plans 6 meals in the delivery for customers on a two meal per 6 day plan on Thursdays", () => {
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

    const actual = planMeals.chooseMeals("Thursday", mealsSelection, customers);

    expect(actual[0].customer).toEqual(customerOne);
    expect(actual[0].meals).toHaveLength(6);
    expect(actual[0].meals[0]).toBe(mealOne);
    expect(actual[0].meals[1]).toBe(mealTwo);
    expect(actual[0].meals[2]).toBe(mealThree);
    expect(actual[0].meals[3]).toBe(mealFour);
    expect(actual[0].meals[4]).toBe(mealFive);
    expect(actual[0].meals[5]).toBe(mealSix);

    expect(actual[1].customer).toEqual(customerTwo);
    expect(actual[1].meals).toHaveLength(6);
    expect(actual[1].meals[0]).toBe(mealOne);
    expect(actual[1].meals[1]).toBe(mealTwo);
    expect(actual[1].meals[2]).toBe(mealThree);
    expect(actual[1].meals[3]).toBe(mealFour);
    expect(actual[1].meals[4]).toBe(mealFive);
    expect(actual[1].meals[5]).toBe(mealSix);

    expect(actual[2].customer).toEqual(customerThree);
    expect(actual[2].meals).toHaveLength(6);
    expect(actual[2].meals[0]).toBe(mealOne);
    expect(actual[2].meals[1]).toBe(mealTwo);
    expect(actual[2].meals[2]).toBe(mealThree);
    expect(actual[2].meals[3]).toBe(mealFour);
    expect(actual[2].meals[4]).toBe(mealFive);
    expect(actual[2].meals[5]).toBe(mealSix);
  });

  it("plans 6 meals in the delivery for customers on a 2 meal per 5 day plan on Mondays", () => {
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
      daysPerWeek: 5,
      snack: Snack.None,
      breakfast: true,
      plan: {
        category: "Mass",
        mealsPerDay: 2,
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

    const actual = planMeals.chooseMeals("Monday", mealsSelection, customers);

    expect(actual[1].customer).toEqual(customerTwo);
    expect(actual[1].meals).toHaveLength(6);
    expect(actual[1].meals[0]).toBe(mealOne);
    expect(actual[1].meals[1]).toBe(mealTwo);
    expect(actual[1].meals[2]).toBe(mealThree);
    expect(actual[1].meals[3]).toBe(mealFour);
    expect(actual[1].meals[4]).toBe(mealFive);
    expect(actual[1].meals[5]).toBe(mealSix);
  });

  it("plans 4 meals in the delivery for customers on a 2 meal per 5 day plan on Thursdays", () => {
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
      daysPerWeek: 5,
      snack: Snack.None,
      breakfast: true,
      plan: {
        category: "Mass",
        mealsPerDay: 2,
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

    const actual = planMeals.chooseMeals("Thursday", mealsSelection, customers);

    expect(actual[1].customer).toEqual(customerTwo);
    expect(actual[1].meals).toHaveLength(4);
    expect(actual[1].meals[0]).toBe(mealOne);
    expect(actual[1].meals[1]).toBe(mealTwo);
    expect(actual[1].meals[2]).toBe(mealThree);
    expect(actual[1].meals[3]).toBe(mealFour);
    expect(actual[1].meals[4]).toBeUndefined();
    expect(actual[1].meals[5]).toBeUndefined();
  });
});
