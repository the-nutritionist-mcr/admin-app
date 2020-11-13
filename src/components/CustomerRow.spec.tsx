import React from "react";
import Customer, { Snack } from "../domain/Customer";
import { Grommet } from "grommet";
import { fireEvent, render } from "@testing-library/react";
import CustomerRow from "./CustomerRow";

describe("The <CustomerRow> component", () => {
  it("Renders a name input with the customer's name", () => {
    const fakeCustomer: Customer = {
      id: 1,
      name: "Ben",
      daysPerWeek: 5,
      email: "a@b.c",
      breakfast: false,
      snack: Snack.None,
      allergicTo: [],
      plan: {
        category: "Mass",
        costPerMeal: 200,
        mealsPerDay: 3,
      },
    };

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={jest.fn()} />
          </tbody>
        </table>
      </Grommet>
    );

    const nameSelector = document.querySelector("input[name='name']") as
      | HTMLInputElement
      | undefined;

    expect(nameSelector?.value).toEqual("Ben");
  });

  it("calls onChange with an edit customer when there is an edit to the name field", () => {
    const fakeCustomer: Customer = {
      id: 1,
      name: "Ben",
      daysPerWeek: 5,
      email: "a@b.c",
      breakfast: false,
      snack: Snack.None,
      allergicTo: [],
      plan: {
        category: "Mass",
        costPerMeal: 200,
        mealsPerDay: 3,
      },
    };

    const mockOnChange = jest.fn();

    render(
      <Grommet plain>
        <table>
          <tbody>
            <CustomerRow customer={fakeCustomer} onChange={mockOnChange} />
          </tbody>
        </table>
      </Grommet>
    );

    const nameInput = document.querySelector("input[name='name']") as
      | HTMLInputElement
      | undefined;

    expect(nameInput).toBeDefined();
    if (nameInput) {
      fireEvent.change(nameInput, { target: { value: "another-name" } });

      expect(mockOnChange).toHaveBeenCalledWith(
        fakeCustomer,
        expect.objectContaining({
          name: "another-name",
        })
      );
    }
  });
});
