import * as API from "../../API";

import { createAction, createReducer } from "@reduxjs/toolkit";

export type Customer = Omit<
  Exclude<API.GetCustomerQuery["getCustomer"], null>,
  "__typename" | "plan"
> & {
  plan: {
    name: string;
    category: string;
    mealsPerDay: number;
    costPerMeal: number;
  };
};

interface CustomerState {
  customers: Customer[];
  page: number;
}

const initialState: CustomerState = {
  customers: [],
  page: 0,
};

export const createCustomerAction = createAction<Customer, "create">("create");
export const deleteCustomerAction = createAction<Customer, "delete">("delete");

const customers = createReducer(initialState, (builder) => {
  builder.addCase(createCustomerAction, (state, action) => ({
    ...state,
    customers: [
      ...state.customers,
      {
        ...action.payload,
        id:
          state.customers.length > 0
            ? String(
                Number.parseInt(
                  state.customers[state.customers.length - 1].id,
                  10
                ) + 1
              )
            : "0",
      },
    ],
  }));

  builder.addCase(deleteCustomerAction, (state, action) => ({
    ...state,
    customers: state.customers.filter(
      (customer) => customer.id !== action.payload.id
    ),
  }));
});

export default customers;
