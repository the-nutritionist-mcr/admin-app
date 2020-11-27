import * as APITypes from "../../API";

import API, { GraphQLResult, graphqlOperation } from "@aws-amplify/api";
import Customer, { Snack } from "../../domain/Customer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCustomer as createCustomerMutation,
  deleteCustomer as deleteCustomerMutation,
  updateCustomer as updateCustomerMutation,
} from "../../graphql/mutations";

import type { AppState } from "../../lib/store";

import LoadingState from "../../types/LoadingState";
import { PlanCategory } from "../../lib/config";
import convertNullsToUndefined from "../../lib/convertNullsToUndefined";
import { listCustomers } from "../../graphql/queries";

interface CustomersState {
  items: Customer[];
  page: number;
  loadingState: LoadingState;
  error?: string;
}

const MALFORMED_RESPONSE = "Response from the server was malformed";

const initialState: CustomersState = {
  items: [],
  page: 0,
  loadingState: LoadingState.Idle,
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

export const removeCustomer = createAsyncThunk(
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

export const updateCustomer = createAsyncThunk(
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

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (customer: Customer): Promise<Customer> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exclusions, id, ...customerWithoutExclusions } = customer;
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

export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  async (): Promise<Customer[]> => {
    const listCustomerVariables: APITypes.ListCustomersQueryVariables = {};
    const listCustomersResult = (await API.graphql(
      graphqlOperation(listCustomers, listCustomerVariables)
    )) as GraphQLResult<APITypes.ListCustomersQuery>;

    const items = listCustomersResult.data?.listCustomers?.items;

    type NotNull = <T>(thing: T | null) => thing is T;

    if (items) {
      return items.filter((Boolean as unknown) as NotNull).map(mapCustomer);
    }

    throw new Error(MALFORMED_RESPONSE);
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(updateCustomer.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(removeCustomer.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(updateCustomer.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });

    builder.addCase(removeCustomer.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });

    builder.addCase(removeCustomer.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items = state.items.filter((item) => item.id !== action.payload);
    });

    builder.addCase(updateCustomer.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      const index = state.items.findIndex(
        (item) => action.payload.id === item.id
      );
      state.items[index] = action.payload;
    });

    builder.addCase(createCustomer.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(createCustomer.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items.push(action.payload);
    });

    builder.addCase(createCustomer.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });

    builder.addCase(fetchCustomers.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(fetchCustomers.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items = action.payload;
    });

    builder.addCase(fetchCustomers.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });
  },
});

export default customersSlice;

export const allCustomersSelector = (state: AppState): Customer[] =>
  state.customers.items;

export const customersLoadingSelector = (state: AppState): LoadingState =>
  state.customers.loadingState;
