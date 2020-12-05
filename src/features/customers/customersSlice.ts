import * as APITypes from "../../API";

import API, { GraphQLResult, graphqlOperation } from "@aws-amplify/api";
import Customer, { Snack } from "../../domain/Customer";
import {
  createCustomer as createCustomerMutation,
  deleteCustomer as deleteCustomerMutation,
  updateCustomer as updateCustomerMutation,
} from "../../graphql/mutations";

import type { AppState } from "../../lib/rootReducer";

import { PlanCategory } from "../../lib/config";
import apiRequestCreator from "../../lib/apiRequestCreator";
import convertNullsToUndefined from "../../lib/convertNullsToUndefined";
import { createSlice } from "@reduxjs/toolkit";
import listCustomersQuery from "./listCustomerQuery";

interface CustomersState {
  items: Customer[];
  page: number;
}

const MALFORMED_RESPONSE = "Response from the server was malformed";

const initialState: CustomersState = {
  items: [],
  page: 0,
};

type RawCustomer = Exclude<
  Exclude<
    Exclude<APITypes.ListCustomersQuery["listCustomers"], null>["items"],
    null
  >[number],
  null
>;

const mapCustomer = (customer: RawCustomer): Customer => {
  const deNulledCustomer = convertNullsToUndefined(customer);
  return {
    ...deNulledCustomer,
    plan: {
      ...deNulledCustomer.plan,
      category: deNulledCustomer.plan.category as PlanCategory,
    },
    snack: deNulledCustomer.snack as Snack,
    exclusions: [],
  };
};

export const removeCustomer = apiRequestCreator(
  "customers/remove",
  async (customer: Customer): Promise<string> => {
    const deleteCustomerVariables: APITypes.DeleteCustomerMutationVariables = {
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

export const updateCustomer = apiRequestCreator(
  "customers/update",
  async (customer: Customer): Promise<Customer> => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exclusions,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createdAt,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updatedAt,
      ...customerWithoutExclusions
    } = customer;
    const updateCustomerVariables: APITypes.UpdateCustomerMutationVariables = {
      input: customerWithoutExclusions,
    };

    const updateCustomerResult = (await API.graphql(
      graphqlOperation(updateCustomerMutation, updateCustomerVariables)
    )) as GraphQLResult<APITypes.UpdateCustomerMutation>;

    const updatedCustomer = updateCustomerResult.data?.updateCustomer;

    if (updatedCustomer) {
      return mapCustomer(updatedCustomer);
    }
    throw new Error(MALFORMED_RESPONSE);
  }
);

export const createCustomer = apiRequestCreator<Customer, Customer>(
  "customers/create",
  async (customer: Customer) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, exclusions, ...customerWithoutExclusions } = customer;
    const createCustomerVariables: APITypes.CreateCustomerMutationVariables = {
      input: customerWithoutExclusions,
    };

    const createCustomerResult = (await API.graphql(
      graphqlOperation(createCustomerMutation, createCustomerVariables)
    )) as GraphQLResult<APITypes.CreateCustomerMutation>;

    const createdCustomer = createCustomerResult.data?.createCustomer;

    if (createdCustomer) {
      return mapCustomer(createdCustomer);
    }
    throw new Error(MALFORMED_RESPONSE);
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
