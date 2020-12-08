import API, { graphqlOperation } from "@aws-amplify/api";
import {
  CreateCustomerMutationVariables,
  DeleteCustomerMutationVariables,
  UpdateCustomerMutationVariables,
} from "../../backend/query-variables-types";

import {
  createCustomerMutation,
  deleteCustomerMutation,
  listCustomersQuery,
  updateCustomerMutation,
} from "./graphql";

import type { AppState } from "../../lib/rootReducer";
import Customer from "../../domain/Customer";

import apiRequestCreator from "../../lib/apiRequestCreator";
import { createSlice } from "@reduxjs/toolkit";

interface CustomersState {
  items: Customer[];
  page: number;
}

const MALFORMED_RESPONSE = "Response from the server was malformed";

const initialState: CustomersState = {
  items: [],
  page: 0,
};

export const updateCustomer = apiRequestCreator(
  "customers/update",
  async (customer: Customer): Promise<Customer> => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exclusions,
      ...customerWithoutExclusions
    } = customer;
    const updateCustomerVariables: UpdateCustomerMutationVariables = {
      input: {
        ...customerWithoutExclusions,
        exclusionIds: exclusions.map((exclusion) => exclusion.id),
      },
    };

    const updateCustomerResult = (await API.graphql(
      graphqlOperation(updateCustomerMutation, updateCustomerVariables)
    )) as {
      data: { createCustomer: Pick<Customer, "exclusions"> };
    };
    return {
      ...customer,
      exclusions: updateCustomerResult.data.createCustomer.exclusions,
    };
    throw new Error(MALFORMED_RESPONSE);
  }
);

export const createCustomer = apiRequestCreator<Customer, Customer>(
  "customers/create",
  async (customer: Customer) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, exclusions, ...customerWithoutExclusions } = customer;
    const createCustomerVariables: CreateCustomerMutationVariables = {
      input: {
        ...customerWithoutExclusions,
        exclusionIds: exclusions.map((exclusion) => exclusion.id),
      },
    };

    const createCustomerResult = (await API.graphql(
      graphqlOperation(createCustomerMutation, createCustomerVariables)
    )) as {
      data: {
        createCustomer: Pick<Customer, "exclusions" | "id">;
      };
    };

    return {
      ...customer,
      exclusions: createCustomerResult.data.createCustomer.exclusions,
      id: createCustomerResult.data.createCustomer.id,
    };
    throw new Error(MALFORMED_RESPONSE);
  }
);

export const removeCustomer = apiRequestCreator(
  "customers/remove",
  async (customer: Customer): Promise<string> => {
    const deleteCustomerVariables: DeleteCustomerMutationVariables = {
      input: {
        id: customer.id,
      },
    };

    await API.graphql(
      graphqlOperation(deleteCustomerMutation, deleteCustomerVariables)
    );
    return customer.id;
  }
);

export const fetchCustomers = apiRequestCreator<Customer[]>(
  "customers/fetch",
  async () => {
    const listCustomersResult = (await API.graphql(
      graphqlOperation(listCustomersQuery)
    )) as {
      data: {
        listCustomers: Customer[];
      };
    };

    return listCustomersResult.data.listCustomers.map((item) => ({
      ...item,
      exclusions: [],
    }));
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(removeCustomer.fulfilled, (state, action): void => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });

    builder.addCase(updateCustomer.fulfilled, (state, action): void => {
      const index = state.items.findIndex(
        (item) => action.payload.id === item.id
      );
      state.items[index] = action.payload;
    });

    builder.addCase(createCustomer.fulfilled, (state, action): void => {
      state.items.push(action.payload);
    });

    builder.addCase(fetchCustomers.fulfilled, (state, action): void => {
      state.items = action.payload;
    });
  },
});

export const asyncActions = [
  fetchCustomers,
  createCustomer,
  updateCustomer,
  removeCustomer,
];

export default customersSlice;

export const allCustomersSelector = (state: AppState): Customer[] =>
  state.customers.items;
