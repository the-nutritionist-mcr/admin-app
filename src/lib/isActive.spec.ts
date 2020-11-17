import Customer, { Snack } from "../domain/Customer";
import isActive from "./isActive";

describe("isActive", () => {
  const oldDateNow = Date.now.bind(global.Date);
  beforeEach(() => {
    // 17th November 2020
    const dateNowStub = jest.fn(() => 1605635814000);
    global.Date.now = dateNowStub;
  });

  afterEach(() => {
    global.Date.now = oldDateNow;
  });

  it("Should return true if there is no pause start or end", () => {
    const customer: Customer = {
      id: 0,
      name: "",
      email: "",
      daysPerWeek: 1,
      plan: {
        category: "Mass",
        mealsPerDay: 1,
        costPerMeal: 1,
      },
      snack: Snack.None,
      breakfast: false,
      exclusions: [],
    };

    const active = isActive(customer);

    expect(active).toEqual(true);
  });

  it("Should be active if there is a pause start date that is in the future", () => {
    const customer: Customer = {
      id: 0,
      name: "",
      email: "",
      daysPerWeek: 1,
      plan: {
        category: "Mass",
        mealsPerDay: 1,
        costPerMeal: 1,
      },
      // 1st February 2021
      pauseStart: new Date(1612137600000),
      snack: Snack.None,
      breakfast: false,
      exclusions: [],
    };

    const active = isActive(customer);

    expect(active).toEqual(true);
  });

  it("Should be inactive if there is a pause start date that is in the past and no pause end", () => {
    const customer: Customer = {
      id: 0,
      name: "",
      email: "",
      daysPerWeek: 1,
      plan: {
        category: "Mass",
        mealsPerDay: 1,
        costPerMeal: 1,
      },
      // 1st of March 2020
      pauseStart: new Date(1583020800000),
      snack: Snack.None,
      breakfast: false,
      exclusions: [],
    };

    const active = isActive(customer);

    expect(active).toEqual(false);
  });

  it("Should be inactive if there is a pause end date that is in the future and no pause start", () => {
    const customer: Customer = {
      id: 0,
      name: "",
      email: "",
      daysPerWeek: 1,
      plan: {
        category: "Mass",
        mealsPerDay: 1,
        costPerMeal: 1,
      },
      // 1st February 2021
      pauseEnd: new Date(1612137600000),
      snack: Snack.None,
      breakfast: false,
      exclusions: [],
    };

    const active = isActive(customer);

    expect(active).toEqual(false);
  });

  it("Should be active if the pause has expired", () => {
    const customer: Customer = {
      id: 0,
      name: "",
      email: "",
      daysPerWeek: 1,
      plan: {
        category: "Mass",
        mealsPerDay: 1,
        costPerMeal: 1,
      },
      // 1st of March 2020
      pauseStart: new Date(1583020800000),

      // 1st of June 2020
      pauseEnd: new Date(1590969600000),
      snack: Snack.None,
      breakfast: false,
      exclusions: [],
    };

    const active = isActive(customer);

    expect(active).toEqual(true);
  });

  it("Should be inactive if the current date is between the pause start and end dates", () => {
    const customer: Customer = {
      id: 0,
      name: "",
      email: "",
      daysPerWeek: 1,
      plan: {
        category: "Mass",
        mealsPerDay: 1,
        costPerMeal: 1,
      },
      // 1st of March 2020
      pauseStart: new Date(1583020800000),

      // 1st February 2021
      pauseEnd: new Date(1612137600000),
      snack: Snack.None,
      breakfast: false,
      exclusions: [],
    };

    const active = isActive(customer);

    expect(active).toEqual(false);
  });
});