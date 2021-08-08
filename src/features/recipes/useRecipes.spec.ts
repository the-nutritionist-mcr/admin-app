import { allRecipesSelector, fetchRecipes } from "./recipesSlice";
import { resetAllWhenMocks, when } from "jest-when";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "../../domain/Recipe";
import { fetchExclusions } from "../exclusions/exclusionsSlice";
import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { renderHook } from "@testing-library/react-hooks";

import useRecipes from "./useRecipes";

jest.mock("react-redux");
jest.mock("./recipesSlice");
jest.mock("../exclusions/exclusionsSlice");

const flushPromises = () => new Promise(setImmediate);

describe("useRecipes", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
  });

  it("Should immediately dispatch fetchRecipes and fetchExclusions if there aren't any loaded", async () => {
    const mockDispatch = jest.fn();
    mocked(fetchRecipes, true).mockReturnValue(
      "recipe-action" as unknown as ReturnType<typeof fetchRecipes>
    );

    mocked(fetchExclusions, true).mockReturnValue(
      "exclusions-action" as unknown as ReturnType<typeof fetchExclusions>
    );
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allRecipesSelector as any)
      .mockReturnValue([]);
    const { waitFor } = renderHook(() => useRecipes());

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith("recipe-action")
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith("exclusions-action")
    );
  });

  it("Should not load recipes if some are already loaded in the redux store", async () => {
    const mockDispatch = jest.fn();
    mocked(fetchRecipes, true).mockReturnValue(
      "recipe-action" as unknown as ReturnType<typeof fetchRecipes>
    );
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allRecipesSelector as any)
      .mockReturnValue([mock<Recipe>()]);
    renderHook(() => useRecipes());
    await flushPromises();

    expect(mockDispatch).not.toHaveBeenCalledWith("recipe-action");
  });

  it("Should provide the recipe value from the redux store", () => {
    const mockRecipes = [mock<Recipe>(), mock<Recipe>()];
    const mockDispatch = jest.fn();
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allRecipesSelector as any)
      .mockReturnValue(mockRecipes);

    const { result } = renderHook(() => useRecipes());

    expect(result.current.recipes).toEqual(mockRecipes);
  });
});
