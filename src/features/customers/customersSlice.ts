import * as APITypes from "../../API";

import API, { GraphQLResult, graphqlOperation } from "@aws-amplify/api";
import Customer, { Snack } from "../../domain/Customer";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";

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

const initialState: CustomersState = {
  items: [],
  page: 0,
  loadingState: LoadingState.Idle,
};

export const fetchCustomers = createAsyncThunk(
  "posts/fetchCustomers",
  async (): Promise<Customer[]> => {
    const listCustomerVariables: APITypes.ListCustomersQueryVariables = {};
    const listCustomersResult = (await API.graphql(
      graphqlOperation(listCustomers, listCustomerVariables)
    )) as GraphQLResult<APITypes.ListCustomersQuery>;

    const items = listCustomersResult.data?.listCustomers?.items;

    type NotNull = <T>(thing: T | null) => thing is T;

    if (items) {
      return items
        .filter((Boolean as unknown) as NotNull)
        .map(convertNullsToUndefined)
        .map((item) => ({
          ...item,
          plan: {
            ...item.plan,
            category: item.plan.category as PlanCategory,
          },
          snack: item.snack as Snack,
          exclusions: [],
        }));
    }

    throw new Error("Response from backend was malformed");
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    createCustomer: {
      reducer: (state, action: PayloadAction<Customer>): void => {
        state.items.push(action.payload);
      },
      prepare: (
        customer: Customer
      ): { payload: PayloadAction<Customer>["payload"] } => {
        return {
          payload: {
            ...customer,
            id: nanoid(),
          },
        };
      },
    },

    removeCustomer: (state, action: PayloadAction<Customer>): typeof state => ({
      ...state,
      items: state.items.filter(
        (customer) => customer.id !== action.payload.id
      ),
    }),
    updateCustomer: (state, action: PayloadAction<Customer>): void => {
      const index = state.items.findIndex(
        (customer) => customer.id === action.payload.id
      );
      state.items[index] = { ...action.payload };
    },
  },

  extraReducers: (builder) => {
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

const {
  createCustomer,
  removeCustomer,
  updateCustomer,
} = customersSlice.actions;

export const allCustomersSelector = (state: AppState): Customer[] =>
  state.customers.items;

export { createCustomer, removeCustomer, updateCustomer };
