import Customer from "../../domain/Customer";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import React from "react";
import ToPackTable from "./ToPackTable";

import { mock } from "jest-mock-extended";
import { shallow } from "enzyme";

describe("The pack table", () => {
  it("should render rows with customers appearing in alphabetical order", () => {
    const customerOne = mock<Customer>();
    customerOne.id = "0";
    customerOne.surname = "Curtis";

    const customerTwo = mock<Customer>();
    customerTwo.id = "1";
    customerTwo.surname = "Alexandria";

    const customerThree = mock<Customer>();
    customerThree.id = "2";
    customerThree.surname = "Davis";

    const customerFour = mock<Customer>();
    customerFour.id = "3";
    customerFour.surname = "Barnes";

    const meals = [
      customerOne,
      customerTwo,
      customerThree,
      customerFour,
    ].map((customer) => ({ customer, meals: [] }));

    const delivery = mock<DeliveryMealsSelection>();

    const wrapper = shallow(
      <ToPackTable deliveryMeals={delivery} customerMeals={meals} />
    );

    const customers = wrapper.find(".customerName");

    expect(customers.at(0).text()).toEqual(
      expect.stringContaining("Alexandria")
    );
    expect(customers.at(1).text()).toEqual(expect.stringContaining("Barnes"));
    expect(customers.at(2).text()).toEqual(expect.stringContaining("Curtis"));
    expect(customers.at(3).text()).toEqual(expect.stringContaining("Davis"));
  });

  it("Should put lowercase letters next to the same uppercase letter", () => {
    const customerOne = mock<Customer>();
    customerOne.id = "0";
    customerOne.surname = "Alexandria";

    const customerTwo = mock<Customer>();
    customerTwo.id = "1";
    customerTwo.surname = "Briany";

    const customerThree = mock<Customer>();
    customerThree.id = "2";
    customerThree.surname = "alexis";

    const meals = [customerOne, customerTwo, customerThree].map((customer) => ({
      customer,
      meals: [],
    }));

    const delivery = mock<DeliveryMealsSelection>();

    const wrapper = shallow(
      <ToPackTable deliveryMeals={delivery} customerMeals={meals} />
    );

    const customers = wrapper.find(".customerName");

    expect(customers.at(0).text()).toEqual(
      expect.stringContaining("Alexandria")
    );
    expect(customers.at(1).text()).toEqual(expect.stringContaining("alexis"));
    expect(customers.at(2).text()).toEqual(expect.stringContaining("Briany"));
  });
});
