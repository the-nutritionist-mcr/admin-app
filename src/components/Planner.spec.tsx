import React from "react";
import Planner from "./Planner";
import { mocked } from "ts-jest/utils";
import { render, fireEvent } from "@testing-library/react";
import { when } from "jest-when";
import { getRecipes } from "../actions/recipes";
import recipeStore from "../stores/RecipeStore";
import recipes from "./fixtures/recipes";

jest.mock("../stores/RecipeStore");
jest.mock("../actions/recipes");

window.scrollTo = jest.fn();

describe("The planner page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Defaults all mealSelectors to 'None' when no selections have been made", () => {
    let loaded = false;

    mocked(recipeStore.getById, true).mockImplementation((id: number) =>
      loaded ? recipes.find((recipe) => recipe.id === id) : undefined
    );

    mocked(recipeStore.getRecipes, true).mockImplementation(() =>
      loaded ? recipes : []
    );

    mocked(getRecipes, true).mockImplementation(() => {
      loaded = true;
    });

    const {
      getByText,
      getAllByText,
      getByDisplayValue,
      getAllByDisplayValue,
    } = render(<Planner />);

    fireEvent.click(getByDisplayValue("Select Day"));
    fireEvent.click(getByText("Monday"));

    const mealSelectors = getAllByDisplayValue("None");

    expect(mealSelectors).toHaveLength(6);
  });
});
