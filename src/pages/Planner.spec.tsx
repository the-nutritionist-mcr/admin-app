import React from "react";
import Planner from "./Planner";
import { mocked } from "ts-jest/utils";
import { render, fireEvent } from "@testing-library/react";
import { when } from "jest-when";
import { getRecipes } from "../actions/recipes";
import { LOCALSTORAGE_KEY_DAY } from "../lib/constants";
import recipeStore from "../stores/RecipeStore";
import customerStore from "../stores/CustomerStore";
import recipes from "../fixtures/recipes";

jest.mock("../stores/CustomerStore");
jest.mock("../stores/RecipeStore");
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

    window.localStorage.__proto__.getItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Defaults all mealSelectors to 'None' when no selections have been made", async () => {
    when(window.localStorage.__proto__.getItem)
      .calledWith(LOCALSTORAGE_KEY_DAY)
      .mockReturnValue(undefined);

    const {
      getByPlaceholderText,
      getAllByPlaceholderText,
      getByText,
      getByDisplayValue,
    } = render(<Planner />);

    fireEvent.click(getByPlaceholderText("Select Day"));
    fireEvent.click(getByText("Monday"));

    const mealSelectors = getAllByPlaceholderText("None");

    expect(mealSelectors).toHaveLength(6);

    Array.from(mealSelectors).forEach((item) =>
      expect((item as HTMLSelectElement).value).toEqual("")
    );
  });

  // it("Renders the cook plan when all sellections have been made", async () => {
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
