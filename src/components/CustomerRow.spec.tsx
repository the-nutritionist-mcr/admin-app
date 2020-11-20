import Customer, { Snack } from "../domain/Customer";

import CustomerRow from "./CustomerRow";
import { Grommet } from "grommet";
import React from "react";
import getExtrasString from "../lib/getExtrasString";
import getStatusString from "../lib/getStatusString";
import { mocked } from "ts-jest/utils";
import { render } from "@testing-library/react";
import { when } from "jest-when";

jest.mock("../lib/getStatusString");
jest.mock("../lib/getExtrasString");

const getFakeCustomer = (): Customer => {
  const fishExclusion = {
    id: 1,
    name: "fish",
    allergen: false,
  };

  const catsExclusion = {
    id: 0,
    name: "cats",
    allergen: false,
  };

  return {
    id: 1,
    salutation: "Mr",
    telephone: "0123451",
    firstName: "Ben",
    surname: "Wainwright",
    address: "Foobar",
    daysPerWeek: 5,
    email: "a@b.c",
    breakfast: false,
    snack: Snack.None,
    exclusions: [fishExclusion, catsExclusion],
    plan: {
      name: "Mass 3",
      category: "Mass",
      costPerMeal: 200,
      mealsPerDay: 3,
    },
  };
};

describe("The <CustomerRow> component", () => {
  it("Renders customer name correctly", () => {
    const fakeCustomer = getFakeCustomer();

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const cells = document.querySelectorAll("th");
    const first = cells.item(0);

    expect(first).toHaveTextContent("Mr Ben Wainwright");
  });

  it("Renders customer email correctly", () => {
    const fakeCustomer = getFakeCustomer();

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const cells = document.querySelectorAll("td");
    const first = cells.item(0);

    expect(first).toHaveTextContent("a@b.c");
  });

  it("Renders customer status correctly", () => {
    const fakeCustomer = getFakeCustomer();

    when(mocked(getStatusString, true))
      .calledWith(fakeCustomer)
      .mockReturnValue("STATUS!");

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const cells = document.querySelectorAll("td");
    const second = cells.item(1);

    expect(second).toHaveTextContent("STATUS!");
  });

  it("Renders the plan correctly", () => {
    const fakeCustomer = getFakeCustomer();

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const cells = document.querySelectorAll("td");
    const fourth = cells.item(2);

    expect(fourth).toHaveTextContent("Mass 3 (5 days)");
  });

  it("Renders the extras correctly", () => {
    const fakeCustomer = getFakeCustomer();

    when(mocked(getExtrasString, true))
      .calledWith(fakeCustomer)
      .mockReturnValue("Extras!");

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const cells = document.querySelectorAll("td");
    const fourth = cells.item(3);

    expect(fourth).toHaveTextContent("Extras!");
  });

  it("Calculates the correct price per week", () => {
    const fakeCustomer = getFakeCustomer();

    when(mocked(getExtrasString, true))
      .calledWith(fakeCustomer)
      .mockReturnValue("Extras!");

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const cells = document.querySelectorAll("td");
    const fifth = cells.item(4);

    expect(fifth).toHaveTextContent("£30.00");
  });

  it("Calculates the correct price per month", () => {
    const fakeCustomer = getFakeCustomer();

    when(mocked(getExtrasString, true))
      .calledWith(fakeCustomer)
      .mockReturnValue("Extras!");

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const cells = document.querySelectorAll("td");
    const sixth = cells.item(5);

    expect(sixth).toHaveTextContent("£130.00");
  });
});
