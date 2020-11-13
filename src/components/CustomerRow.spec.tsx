import Customer, { Snack } from "../domain/Customer";
import { fireEvent, render } from "@testing-library/react";

import CustomerRow from "./CustomerRow";
import { Grommet } from "grommet";
import React from "react";

describe("The <CustomerRow> component", () => {
  it("Renders customer data in row fields", () => {
    const fakeCustomer: Customer = {
      id: 1,
      name: "Ben",
      daysPerWeek: 5,
      email: "a@b.c",
      breakfast: false,
      snack: Snack.None,
      allergicTo: ["fish", "cats"],
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

    const emailSelector = document.querySelector("input[name='email']") as
      | HTMLInputElement
      | undefined;

    expect(emailSelector?.value).toEqual("a@b.c");

    const daysPerWeekSelector = document.querySelector(
      "input[name='daysPerWeek']"
    ) as HTMLInputElement | undefined;

    expect(daysPerWeekSelector?.value).toEqual("5");
  });

  it("calls onChange with an edited customer when edited", () => {
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
