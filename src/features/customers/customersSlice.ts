import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";

import type { AppState } from "../../lib/store";

import Customer from "../../domain/Customer";
import LoadingState from "../../types/LoadingState";

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
});

export const fetchCustomers = createAsyncThunk(
  "posts/fetchCustomers",
  async (): Promise<Customer[]> => {
    return Promise.resolve([]);
  }
);

export default customersSlice;

const {
  createCustomer,
  removeCustomer,
  updateCustomer,
} = customersSlice.actions;

export const allCustomersSelector = (state: AppState): Customer[] =>
  state.customers.items;

export { createCustomer, removeCustomer, updateCustomer };
