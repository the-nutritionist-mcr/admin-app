import { fireEvent, render } from "@testing-library/react";

import Planner from "./Planner";
import React from "react";

import customerStore from "../stores/customerStore";
import { getRecipes } from "../actions/recipes";
import { mocked } from "ts-jest/utils";
import recipeStore from "../stores/recipeStore";
import recipes from "../fixtures/recipes";

jest.mock("../stores/CustomerStore");
jest.mock("../stores/recipeStore");
jest.mock("../actions/recipes");

window.scrollTo = jest.fn();

describe("The planner page", () => {
  beforeEach(() => {
    let loaded = false;
    mocked(recipeStore.getById, true).mockImplementation((id: number) =>
      loaded ? recipes.find((recipe) => recipe.id === id) : undefined
    );

    mocked(recipeStore.getRecipes, true).mockImplementation(() =>
      loaded ? recipes : []
    );

    mocked(customerStore.getCustomers, true).mockReturnValue([]);

    mocked(getRecipes, true).mockImplementation(() => {
      loaded = true;
    });

    window.localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Defaults all mealSelectors to 'None' when no selections have been made", async () => {
    const { getByPlaceholderText, getAllByPlaceholderText, getByText } = render(
      <Planner />
    );

    fireEvent.click(getByPlaceholderText("Select Day"));
    fireEvent.click(getByText("Monday"));

    const mealSelectors = getAllByPlaceholderText("None");

    expect(mealSelectors).toHaveLength(6);

    [...mealSelectors].forEach((item) =>
      expect((item as HTMLSelectElement).value).toEqual("")
    );
  });

  // It("Renders the cook plan when all sellections have been made", async () => {
  //   when(window.localStorage.__proto__.getItem)
  //     .calledWith(LOCALSTORAGE_KEY_DAY)
  //     .mockReturnValue(undefined);

  //   const {
  //     findByText,
  //     getByText,
  //     getAllByDisplayValue,
  //     getByDisplayValue,
  //   } = render(<Planner />);

  //   fireEvent.click(getByDisplayValue(""));
  //   fireEvent.click(getByText("Monday"));

  //   await waitFor(() => {
  //     const mealSelectors = getAllByDisplayValue("None");
  //     Array.from(mealSelectors).forEach((selector, index) => {
  //       act(() => {
  //         fireEvent.click(selector);
  //       });
  //       fireEvent.click(getByText(recipes[index].name));
  //     });
  //   });

  //   expect(findByText("Rendered Cook Plan")).not.toBeNull();
  // });
});
