import { allExclusionsSelector, fetchExclusions } from "./exclusionsSlice";
import { resetAllWhenMocks, when } from "jest-when";
import { useDispatch, useSelector } from "react-redux";
import Exclusion from "../../domain/Exclusion";
import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { renderHook } from "@testing-library/react-hooks";

import useExclusions from "./useExclusions";

jest.mock("react-redux");
jest.mock("./exclusionsSlice");
jest.mock("../exclusions/exclusionsSlice");

describe("useExclusions", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
  });

  it("Should immediately dispatch fetchExclusions if there aren't any loaded", async () => {
    const mockDispatch = jest.fn();

    mocked(fetchExclusions, true).mockReturnValue(
      "exclusions-action" as unknown as ReturnType<typeof fetchExclusions>
    );
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allExclusionsSelector as any)
      .mockReturnValue([]);
    const { waitFor } = renderHook(() => useExclusions());

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith("exclusions-action")
    );
  });

  it("Should not load exclusions if some are already loaded in the redux store", async () => {
    const mockDispatch = jest.fn();
    mocked(fetchExclusions, true).mockReturnValue(
      "exclusions-action" as unknown as ReturnType<typeof fetchExclusions>
    );
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allExclusionsSelector as any)
      .mockReturnValue([mock<Exclusion>()]);
    renderHook(() => useExclusions());

    expect(mockDispatch).not.toHaveBeenCalledWith("exclusions-action");
  });

  it("Should provide the recipe value from the redux store", () => {
    const mockExclusions = [mock<Exclusion>(), mock<Exclusion>()];
    const mockDispatch = jest.fn();
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allExclusionsSelector as any)
      .mockReturnValue(mockExclusions);

    const { result } = renderHook(() => useExclusions());

    expect(result.current.exclusions).toEqual(mockExclusions);
  });
});
