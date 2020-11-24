import Customer, { Snack } from "../domain/Customer";
import { act, fireEvent, render } from "@testing-library/react";

import CustomerRow from "./CustomerRow";
import { Grommet } from "grommet";
import React from "react";
import { deleteCustomer } from "../actions/customers";
import getExtrasString from "../lib/getExtrasString";
import getStatusString from "../lib/getStatusString";
import { mocked } from "ts-jest/utils";
import { when } from "jest-when";

jest.mock("../lib/getStatusString");
jest.mock("../lib/getExtrasString");
jest.mock("../actions/customers");

const getFakeCustomer = (): Customer => {
  const fishExclusion = {
    id: "1",
    name: "fish",
    allergen: false,
  };

  const catsExclusion = {
    id: "0",
    name: "cats",
    allergen: false,
  };

  return {
    id: "1",
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

  it("Renders the exclusions correctly when there are some", () => {
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
    const seventh = cells.item(6);

    expect(seventh).toHaveTextContent("fish, cats");
  });

  it("Renders the exclusions correctly when there aren't any", () => {
    const fakeCustomer = getFakeCustomer();

    fakeCustomer.exclusions = [];

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
    const seventh = cells.item(6);

    expect(seventh).toHaveTextContent("None");
  });

  it("Shows the delete dialog when the delete button is clicked", () => {
    const fakeCustomer = getFakeCustomer();

    const { getByText } = render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const deleteButton = document.querySelector("button[aria-label='Delete']");
    expect(deleteButton).toBeDefined();
    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(getByText("Are you sure?")).not.toBeNull();
    }
  });

  it("Hides the delete button when the Ok button is clicked in the delete dialog", () => {
    const fakeCustomer = getFakeCustomer();

    const { queryByText, getByText } = render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const deleteButton = document.querySelector("button[aria-label='Delete']");
    expect(deleteButton).toBeDefined();
    if (deleteButton) {
      act(() => {
        fireEvent.click(deleteButton);
      });
      act(() => {
        fireEvent.click(getByText("Ok"));
      });
      expect(queryByText("Are you sure?")).toBeNull();
    }
  });

  it("Calls 'delete customer' when the delete dialog is confirmed", () => {
    const fakeCustomer = getFakeCustomer();

    const { getByText } = render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const deleteButton = document.querySelector("button[aria-label='Delete']");
    expect(deleteButton).toBeDefined();
    if (deleteButton) {
      act(() => {
        fireEvent.click(deleteButton);
      });
      act(() => {
        fireEvent.click(getByText("Ok"));
      });
      expect(mocked(deleteCustomer)).toHaveBeenCalledWith(fakeCustomer);
    }
  });

  it("Does not call 'delete customer' if you click cancel in the delete dialog", () => {
    const fakeCustomer = getFakeCustomer();

    const { getByText } = render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const deleteButton = document.querySelector("button[aria-label='Delete']");
    expect(deleteButton).toBeDefined();
    if (deleteButton) {
      act(() => {
        fireEvent.click(deleteButton);
      });
      act(() => {
        fireEvent.click(getByText("Cancel"));
      });
      expect(mocked(deleteCustomer)).not.toHaveBeenCalled();
    }
  });

  it("Shows the 'pause' dialog if you click the pause button", () => {
    const fakeCustomer = getFakeCustomer();

    const { getByText } = render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const pauseButton = document.querySelector("button[aria-label='Pause']");
    expect(pauseButton).toBeDefined();
    if (pauseButton) {
      act(() => {
        fireEvent.click(pauseButton);
      });
      expect(getByText("Add Pause")).not.toBeNull();
    }
  });

  it("Shows the 'edit' dialog if you click the edit button", () => {
    const fakeCustomer = getFakeCustomer();

    const { getByText } = render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const editButton = document.querySelector("button[aria-label='Edit']");
    expect(editButton).toBeDefined();
    if (editButton) {
      act(() => {
        fireEvent.click(editButton);
      });
      expect(getByText("Edit Customer")).not.toBeNull();
    }
  });
});
