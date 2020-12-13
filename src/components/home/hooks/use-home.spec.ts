import Customer from "../../../domain/Customer";
import isActive from "../../../lib/isActive";
import { mock } from "jest-mock-extended";
import { mocked } from "ts-jest/utils";
import { renderHook } from "@testing-library/react-hooks";
import useCustomers from "../../../features/customers/useCustomers";
import useHome from "./use-home";

jest.mock("../../../features/customers/useCustomers");
jest.mock("../../../lib/isActive");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("useHome", () => {
  it("Gets the customers from useCustomers and then returns the number of active ones", () => {
    const mockCustomers = [
      mock<Customer>(),
      mock<Customer>(),
      mock<Customer>(),
    ];
    mocked(useCustomers, true).mockReturnValue({ customers: mockCustomers });

    mocked(isActive, true).mockImplementation((customer: Customer) => {
      if (customer === mockCustomers[0]) return true;
      if (customer === mockCustomers[1]) return true;
      if (customer === mockCustomers[2]) return false;
      return false;
    });

    const { result } = renderHook(() => useHome());

    expect(result.current.activePlans).toEqual(2);
  });
});
