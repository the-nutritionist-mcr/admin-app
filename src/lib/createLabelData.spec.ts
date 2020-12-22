import Customer, { Snack } from "../domain/Customer";
import Recipe, { HotOrCold } from "../domain/Recipe";
import CustomerMealsSelection from "../types/CustomerMealsSelection";

import createLabelData from "./createLabelData";

describe("create label data", () => {
  it("creates the correct data for the labels", () => {
    const customerOne: Customer = {
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

      plan: {
        name: "Mass 5",
        category: "Mass",
        mealsPerDay: 5,
        costPerMeal: 885,
      },
      exclusions: [],
    };

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
        meals: [recipeOne, recipeTwo, recipeThree],
        customer: customerOne,
      },
      {
        meals: [recipeOne],
        customer: customerTwo,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = createLabelData(plan) as any;
    expect(result[1].firstName).toEqual("baz-customer");
    expect(result[1].surname).toEqual("bash");
    expect(result[1].name).toEqual("bar-recipe");
    expect(result[1].potentialExclusions).toBeUndefined();
    expect(result[1].exclusions).toBeUndefined();
    expect(result[1].plan).toEqual("Mass 2");
    expect(result[1].id).toBeUndefined();
  });

  it("creates the correct number of labels", () => {
    const customerOne: Customer = {
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

      plan: {
        name: "Mass 5",
        category: "Mass",
        mealsPerDay: 5,
        costPerMeal: 885,
      },
      exclusions: [],
    };

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
        meals: [recipeOne, recipeTwo, recipeThree],
        customer: customerOne,
      },
      {
        meals: [recipeOne],
        customer: customerTwo,
      },
    ];

    const result = createLabelData(plan);
    expect(result).toHaveLength(4);
  });
});
