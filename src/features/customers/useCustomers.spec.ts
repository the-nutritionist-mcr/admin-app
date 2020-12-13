import { allCustomersSelector, fetchCustomers } from "./customersSlice";
import { resetAllWhenMocks, when } from "jest-when";
import { useDispatch, useSelector } from "react-redux";
import Customer from "../../domain/Customer";
import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { renderHook } from "@testing-library/react-hooks";

import useCustomers from "./useCustomers";

jest.mock("react-redux");
jest.mock("./customersSlice");

describe("useCustomers", () => {
  beforeEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
  });

  it("Should immediately dispatch fetchCustomers", async () => {
    const mockDispatch = jest.fn();
    mocked(fetchCustomers, true).mockReturnValue(
      ("customer-action" as unknown) as ReturnType<typeof fetchCustomers>
    );
    mocked(useDispatch, true).mockReturnValue(mockDispatch);
    const { waitFor } = renderHook(() => useCustomers());

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith("customer-action")
    );
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
