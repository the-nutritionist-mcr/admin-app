import {
  customerSelectionsSelector,
  plannedMealsSelector,
} from "./planner-reducer";
import { resetAllWhenMocks, when } from "jest-when";
import Customer from "../../domain/Customer";
import CustomerMealsSelection from "../../types/CustomerMealsSelection";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import React from "react";
import ToPackRow from "./ToPackRow";
import ToPackTable from "./ToPackTable";

import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { shallow } from "enzyme";
import { useSelector } from "react-redux";

jest.mock("react-redux");

beforeEach(() => resetAllWhenMocks());

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

    const delivery: DeliveryMealsSelection = [];

    when(mocked(useSelector, true))
      .calledWith(
        customerSelectionsSelector as (state: unknown) => CustomerMealsSelection
      )
      .mockReturnValue(meals);

    when(mocked(useSelector, true))
      .calledWith(
        plannedMealsSelector as (state: unknown) => DeliveryMealsSelection
      )
      .mockReturnValue(delivery);

    const wrapper = shallow(
      <ToPackTable onClear={jest.fn()} onNext={jest.fn()} />
    );

    const customers = wrapper.find(ToPackRow);

    expect(customers.at(0).props().customerSelection.customer.surname).toEqual(
      "Alexandria"
    );
    expect(customers.at(1).props().customerSelection.customer.surname).toEqual(
      "Barnes"
    );
    expect(customers.at(2).props().customerSelection.customer.surname).toEqual(
      "Curtis"
    );
    expect(customers.at(3).props().customerSelection.customer.surname).toEqual(
      "Davis"
    );
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

    const delivery: DeliveryMealsSelection = [];

    when(mocked(useSelector, true))
      .calledWith(
        customerSelectionsSelector as (state: unknown) => CustomerMealsSelection
      )
      .mockReturnValue(meals);

    when(mocked(useSelector, true))
      .calledWith(
        plannedMealsSelector as (state: unknown) => DeliveryMealsSelection
      )
      .mockReturnValue(delivery);

    const wrapper = shallow(
      <ToPackTable onClear={jest.fn()} onNext={jest.fn()} />
    );

    const customers = wrapper.find(ToPackRow);

    expect(customers.at(0).props().customerSelection.customer.surname).toEqual(
      "Alexandria"
    );
    expect(customers.at(1).props().customerSelection.customer.surname).toEqual(
      "alexis"
    );
    expect(customers.at(2).props().customerSelection.customer.surname).toEqual(
      "Briany"
    );
  });
});
