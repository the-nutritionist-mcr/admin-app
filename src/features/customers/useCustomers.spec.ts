import { allCustomersSelector, fetchCustomers } from "./customersSlice";
import { resetAllWhenMocks, when } from "jest-when";
import { useDispatch, useSelector } from "react-redux";
import Customer from "../../domain/Customer";
import { fetchExclusions } from "../exclusions/exclusionsSlice";
import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { renderHook } from "@testing-library/react-hooks";

import useCustomers from "./useCustomers";

jest.mock("react-redux");
jest.mock("./customersSlice");
jest.mock("../exclusions/exclusionsSlice");

const flushPromises = () => new Promise(setImmediate);

describe("useCustomers", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
  });

  it("Should immediately dispatch fetchCustomers and fetchExclusions if there aren't any loaded", async () => {
    const mockDispatch = jest.fn();
    mocked(fetchCustomers, true).mockReturnValue(
      ("customer-action" as unknown) as ReturnType<typeof fetchCustomers>
    );

    mocked(fetchExclusions, true).mockReturnValue(
      ("exclusion-action" as unknown) as ReturnType<typeof fetchExclusions>
    );
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allCustomersSelector as any)
      .mockReturnValue([]);
    const { waitFor } = renderHook(() => useCustomers());

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith("customer-action")
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith("exclusion-action")
    );
  });

  it("Should not load customers if some are already loaded in the redux store", async () => {
    const mockDispatch = jest.fn();
    mocked(fetchCustomers, true).mockReturnValue(
      ("customer-action" as unknown) as ReturnType<typeof fetchCustomers>
    );
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allCustomersSelector as any)
      .mockReturnValue([mock<Customer>()]);
    renderHook(() => useCustomers());
    await flushPromises();

    expect(mockDispatch).not.toHaveBeenCalledWith("customer-action");
  });

  it("Should provide the customer value from the redux store", () => {
    const mockCustomers = [mock<Customer>(), mock<Customer>()];
    const mockDispatch = jest.fn();
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    when(mocked(useSelector, true))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .calledWith(allCustomersSelector as any)
      .mockReturnValue(mockCustomers);

    const { result } = renderHook(() => useCustomers());

    expect(result.current.customers).toEqual(mockCustomers);
  });
});
