import Customer, { Snack } from "../domain/Customer";

import CustomerRow from "./CustomerRow";
import { Grommet } from "grommet";
import React from "react";
import { render } from "@testing-library/react";

describe("The <CustomerRow> component", () => {
  it("Renders customer data in row fields", () => {
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

    const fakeCustomer: Customer = {
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
});
