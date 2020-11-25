import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../lib/reduxStore";

import Customer from "../../domain/Customer";

interface CustomersState {
  items: Customer[];
  page: number;
}

const initialState: CustomersState = {
  items: [],
  page: 0,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    createCustomer: (state, action: PayloadAction<Customer>): void => {
      state.items.push(action.payload);
    },

    removeCustomer: (state, action: PayloadAction<Customer>): typeof state => ({
      ...state,
      items: state.items.filter(
        (customer) => customer.id === action.payload.id
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

export default customersSlice;

const {
  createCustomer,
  removeCustomer,
  updateCustomer,
} = customersSlice.actions;

export const allCustomersSelector = (state: AppState): Customer[] =>
  state.customers.items;

export { createCustomer, removeCustomer, updateCustomer };
