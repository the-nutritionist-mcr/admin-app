import * as APITypes from "../../API";

import API, { GraphQLResult, graphqlOperation } from "@aws-amplify/api";
import Customer, { Snack } from "../../domain/Customer";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../lib/store";

import LoadingState from "../../types/LoadingState";
import { PlanCategory } from "../../lib/config";
import convertNullsToUndefined from "../../lib/convertNullsToUndefined";
import { createCustomer as createCustomerMutation } from "../../graphql/mutations";
import { listCustomers } from "../../graphql/queries";

interface CustomersState {
  items: Customer[];
  page: number;
  loadingState: LoadingState;
  error?: string;
}

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

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async (customer: Customer): Promise<Customer> => {
    return Promise.resolve(customer);
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
    throw new Error("Response from backend was malformed");
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

    throw new Error("Response from backend was malformed");
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    removeCustomer: (state, action: PayloadAction<Customer>): typeof state => ({
      ...state,
      items: state.items.filter(
        (customer) => customer.id !== action.payload.id
      ),
    }),
  },

  extraReducers: (builder) => {
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

const { removeCustomer } = customersSlice.actions;

export const allCustomersSelector = (state: AppState): Customer[] =>
  state.customers.items;

export { removeCustomer };
