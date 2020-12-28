import * as planMeals from "./plan-meals";

import Customer, { Snack } from "../domain/Customer";
import Recipe, { HotOrCold } from "../domain/Recipe";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import DeliveryDay from "../types/DeliveryDay";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import { mock as mockExtended } from "jest-mock-extended";

describe("chooseMeals", () => {
  it("ignores inactive customers", () => {
    const mealOne = mockExtended<Recipe>();
    const mealTwo = mockExtended<Recipe>();

    const mealsSelection: DeliveryMealsSelection = [mealOne, mealTwo];

    const fishExclusion = {
      id: "0",
      name: "fish",
      allergen: false,
    };

    const customerOne: Customer = {
      telephone: "123123",
      id: "1",
      salutation: "Mr",
      address: "somewhere",
      firstName: "Ben",
      surname: "Wainwright",
      email: "foo-email",
      daysPerWeek: 6,
      snack: Snack.None,
      breakfast: false,
      plan: {
        name: "Mass 2",
        category: "Mass",
        mealsPerDay: 2,
        costPerMeal: 885,
      },
      exclusions: [],
    };

    const customerTwo: Customer = {
      id: "2",
      salutation: "mr",
      address: "Somewhere",
      telephone: "023",
      firstName: "bar-customer",
      surname: "baz",
      email: "bar-email",
      daysPerWeek: 1,
      snack: Snack.None,
      breakfast: true,

      // 1st of March 2020
      pauseStart: new Date(1583020800000).toISOString(),

      // 1st of December 2020
      pauseEnd: new Date(1606780800000).toISOString(),
      plan: {
        name: "Mass 5",
        category: "Mass",
        mealsPerDay: 5,
        costPerMeal: 885,
      },
      exclusions: [fishExclusion],
    };

    const customerThree: Customer = {
      id: "3",
      salutation: "Mr",
      address: "Foobar",
      telephone: "123",
      firstName: "baz-customer",
      surname: "bash",
      email: "baz-email",
      daysPerWeek: 6,
      snack: Snack.None,
      breakfast: true,
      plan: {
        name: "Mass 2",
        category: "Mass",
        mealsPerDay: 2,
        costPerMeal: 885,
      },
      exclusions: [fishExclusion],
    };

    const customers = [customerOne, customerTwo, customerThree];

    const oldDateNow = Date.now.bind(global.Date);
    // 17th November 2020
    const dateNowStub = jest.fn(() => 1605635814000);
    global.Date.now = dateNowStub;

    const actual = planMeals.chooseMeals("Monday", mealsSelection, customers);

    expect(actual).toHaveLength(2);

    global.Date.now = oldDateNow;
  });

  it("returns an empty array if there are no customers", () => {
    const mealsSelection: DeliveryMealsSelection = [
      {
        id: "1",
        name: "foo",
        hotOrCold: HotOrCold.Hot,
        shortName: "f",
        potentialExclusions: [
          {
            id: "0",
            name: "fish",
            allergen: false,
          },
          {
            id: "1",
            name: "rice",
            allergen: true,
          },
        ],
      },
      {
        id: "2",
        hotOrCold: HotOrCold.Hot,
        shortName: "ba",
        name: "bar",
        potentialExclusions: [],
      },
    ];

    const actual = planMeals.chooseMeals("Monday", mealsSelection, []);

    expect(actual).toBeInstanceOf(Array);
    expect(actual).toHaveLength(0);
  });

  it("Throws an error if a plans contains an unsupported number of meals per day", () => {
    const mealOne = mockExtended<Recipe>();

    const mealsSelection: DeliveryMealsSelection = [mealOne];

    const customerOne: Customer = {
      id: "1",
      firstName: "foo-customer",
      surname: "baz",
      telephone: "0123",
      salutation: "Mr",
      address: "Foo",
      email: "foo-email",
      daysPerWeek: 2,
      snack: Snack.None,
      breakfast: false,
      plan: {
        name: "Mass 2",
        category: "Mass",
        mealsPerDay: 2,
        costPerMeal: 885,
      },
      exclusions: [],
    };

    const customers = [customerOne];

    expect(() =>
      planMeals.chooseMeals("Monday", mealsSelection, customers)
    ).toThrow(new Error("4 meals per week is not currently supported"));
  });

  it.each([
    [9, "Monday", 3, 7],
    [6, "Monday", 2, 7],
    [3, "Monday", 1, 7],
    [12, "Thursday", 3, 7],
    [8, "Thursday", 2, 7],
    [4, "Thursday", 1, 7],
    [9, "Thursday", 3, 6],
    [6, "Thursday", 2, 6],
    [3, "Thursday", 1, 6],
    [9, "Monday", 3, 5],
    [6, "Monday", 2, 6],
    [6, "Monday", 2, 5],
    [3, "Monday", 1, 5],
    [6, "Thursday", 3, 5],
    [4, "Thursday", 2, 5],
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

      const fishExclusion = {
        id: "0",
        name: "fish",
        allergen: false,
      };

      const customerOne: Customer = {
        id: "1",
        salutation: "Mr",
        firstName: "foo-customer",
        surname: "foo",
        telephone: "123",
        address: "123123",
        email: "foo-email",
        daysPerWeek: 6,
        snack: Snack.None,
        breakfast: false,
        plan: {
          name: "Mass 2",
          category: "Mass",
          mealsPerDay: 2,
          costPerMeal: 885,
        },
        exclusions: [],
      };

      const customerTwo: Customer = {
        id: "2",
        salutation: "Mr",
        address: "asdasd",
        telephone: "1231",
        firstName: "bar-customer",
        surname: "asdasd",
        email: "bar-email",
        daysPerWeek,
        snack: Snack.None,
        breakfast: true,
        plan: {
          category: "Mass",
          name: "Mass 5",
          mealsPerDay,
          costPerMeal: 885,
        },
        exclusions: [fishExclusion],
      };

      const customerThree: Customer = {
        id: "3",
        telephone: "123",
        firstName: "baz-customer",
        surname: "asd",
        address: "asdasd",
        salutation: "Mr",
        email: "baz-email",
        daysPerWeek: 6,
        snack: Snack.None,
        breakfast: true,
        plan: {
          name: "Mass 2",
          category: "Mass",
          mealsPerDay: 2,
          costPerMeal: 885,
        },
        exclusions: [fishExclusion],
      };

      const customers = [customerOne, customerTwo, customerThree];

      const actual = planMeals.chooseMeals(
        day as DeliveryDay,
        mealsSelection,
        customers
      );

      expect(actual[1].customer).toEqual(customerTwo);
      expect(actual[1].meals).toHaveLength(meals);

      [...new Array(meals)].forEach((_item, index) => {
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
      id: "0",
      hotOrCold: HotOrCold.Hot,
      shortName: "foo",
      name: "foo-recipe",
      potentialExclusions: [],
    };

    const recipeTwo: Recipe = {
      id: "1",
      hotOrCold: HotOrCold.Hot,
      shortName: "bar",
      name: "bar-recipe",
      potentialExclusions: [],
    };

    const recipeThree: Recipe = {
      id: "2",
      hotOrCold: HotOrCold.Hot,
      shortName: "baz",
      name: "baz-recipe",
      potentialExclusions: [],
    };

    const plan: CustomerMealsSelection = [
      {
        meals: [recipeOne, recipeTwo],
        customer: {
          id: "0",
          firstName: "foo",
          surname: "bar",
          salutation: "Mr",
          address: "asdasd",
          telephone: "123123",
          email: "foo-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            name: "Mas 2",
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          exclusions: [],
        },
      },
      {
        meals: [recipeOne],
        customer: {
          id: "1",
          firstName: "foo1",
          surname: "foo1",
          address: "asdasd",
          telephone: "123123",
          salutation: "Mr",
          email: "foo1-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            name: "Mass 2",
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          exclusions: [],
        },
      },
      {
        meals: [recipeOne, recipeTwo, recipeThree],
        customer: {
          id: "2",
          firstName: "foo2",
          surname: "foo3",
          address: "fasdasd",
          telephone: "123123",
          salutation: "Mr",
          email: "foo2-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            name: "Mass 2",
            costPerMeal: 850,
            category: "Mass",
          },
          exclusions: [],
        },
      },
    ];

    const actual = planMeals.makePlan(plan);

    expect(actual).toHaveLength(3);

    const firstPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeOne.name
    );

    expect(firstPlan?.plan["Mass"].count).toEqual(3);

    const secondPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeTwo.name
    );

    expect(secondPlan?.plan["Mass"].count).toEqual(2);

    const thirdPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeThree.name
    );

    expect(thirdPlan?.plan["Mass"].count).toEqual(1);
  });

  it("Groups matching allergens together as a 'variant'", () => {
    const fishExclusion = {
      id: "0",
      name: "fish",
      allergen: false,
    };

    const recipeOne: Recipe = {
      id: "0",
      hotOrCold: HotOrCold.Hot,
      shortName: "foo",
      name: "foo-recipe",
      potentialExclusions: [fishExclusion],
    };

    const recipeTwo: Recipe = {
      id: "1",
      hotOrCold: HotOrCold.Hot,
      shortName: "bar",
      name: "bar-recipe",
      potentialExclusions: [],
    };

    const recipeThree: Recipe = {
      id: "2",
      hotOrCold: HotOrCold.Hot,
      shortName: "baz",
      name: "baz-recipe",
      potentialExclusions: [],
    };

    const plan: CustomerMealsSelection = [
      {
        meals: [recipeOne, recipeTwo],
        customer: {
          id: "0",
          firstName: "foo",
          surname: "foo",
          address: "asdasd",
          salutation: "Mr",
          telephone: "123123",
          email: "foo-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            mealsPerDay: 2,
            name: "Mass 2",
            costPerMeal: 850,
            category: "Mass",
          },
          exclusions: [],
        },
      },
      {
        meals: [recipeOne],
        customer: {
          id: "1",
          firstName: "Ben",
          surname: "foo1",
          address: "asdasd",
          salutation: "Mr",
          telephone: "231",
          email: "foo1-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            name: "Mass 2",
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          exclusions: [fishExclusion],
        },
      },
      {
        meals: [recipeOne, recipeTwo, recipeThree],
        customer: {
          id: "2",
          firstName: "foo",
          surname: "foo2",
          address: "asdasd",
          telephone: "123123",
          salutation: "Mr",
          email: "foo2-email",
          daysPerWeek: 6,
          breakfast: false,
          snack: Snack.None,
          plan: {
            name: "Mass 2",
            mealsPerDay: 2,
            costPerMeal: 850,
            category: "Mass",
          },
          exclusions: [],
        },
      },
    ];

    const actual = planMeals.makePlan(plan);

    expect(actual).toHaveLength(3);

    const firstPlan = actual.find(
      (individualPlan) => individualPlan.recipe.name === recipeOne.name
    );

    expect(firstPlan?.plan["Mass (fish)"].count).toEqual(1);
    expect(firstPlan?.plan["Mass"].count).toEqual(2);
  });
});
