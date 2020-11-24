import * as tAPI from "../API";
import { API, GraphQLResult } from "@aws-amplify/api";
import Customer, { Snack } from "../domain/Customer";
import dispatcher, { DispatchPayload } from "../appDispatcher";
import ActionType from "../types/ActionType";
import { PlanCategory } from "../lib/config";
import { graphqlOperation } from "aws-amplify";
import { listCustomers } from "../graphql/queries";

export const getCustomers = async (): Promise<void> => {
  const queryVariables: tAPI.ListCustomersQueryVariables = {};
  const result: GraphQLResult<tAPI.ListCustomersQuery> = (await API.graphql(
    graphqlOperation(listCustomers, queryVariables)
  )) as GraphQLResult<tAPI.ListCustomersQuery>;

  if (result.data?.listCustomers) {
    const items = result.data.listCustomers.items;
    type ExcludesFalse = <T>(x: T | null) => x is T;

    const customers: Customer[] =
      items !== null
        ? items.filter((Boolean as unknown) as ExcludesFalse).map((item) => ({
            ...item,
            startDate: item.startDate ? new Date(item.startDate) : undefined,
            pauseStart: item.pauseStart ? new Date(item.pauseStart) : undefined,
            pauseEnd: item.pauseEnd ? new Date(item.pauseEnd) : undefined,
            notes: item.notes ?? undefined,
            legacyPrice: item.legacyPrice ?? undefined,
            snack: item.snack as Snack,
            exclusions: [],
            plan: {
              ...item.plan,
              category: item.plan.category as PlanCategory,
            },
          }))
        : [];

    const payload: DispatchPayload = {
      actionType: ActionType.GetCustomers,
      data: customers,
    };
    dispatcher.dispatch(payload);
  }
};

export const createBlankCustomer = (): void => {
  // Const customers = getFromLocalStorage();
  // const blankCustomer: Customer = {
  //   id: customers.length > 0 ? customers[customers.length - 1].id + 1 : 1,
  //   firstName: "",
  //   surname: "",
  //   salutation: "",
  //   telephone: "",
  //   address: "",
  //   notes: "",
  //   email: "",
  //   daysPerWeek: daysPerWeekOptions[0],
  //   plan: plans[0],
  //   snack: Snack.None,
  //   breakfast: false,
  //   exclusions: [],
  // };
  // customers.push(blankCustomer);
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.CreateBlankCustomer,
  //   data: customers,
  // };
  // dispatcher.dispatch(payload);
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export const createNewCustomer = (customer: Customer): void => {
  // Const customers = getFromLocalStorage();
  // customers.push({
  //   ...customer,
  //   id: customers.length > 0 ? customers[customers.length - 1].id + 1 : 1,
  // });
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.CreateBlankCustomer,
  //   data: customers,
  // };
  // dispatcher.dispatch(payload);
};

export const updateCustomer = (
  oldCustomer: Customer,
  customer: Customer
): void => {
  // Const customers = getFromLocalStorage();
  // const index = customers.findIndex(
  //   (customerAtPosition) => customerAtPosition.id === oldCustomer.id
  // );
  // customers[index] = customer;
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.UpdateCustomer,
  //   data: customers,
  // };
  // dispatcher.dispatch(payload);
};

export const deleteCustomer = (customer: Customer): void => {
  // // eslint-disable-next-line fp/no-let
  // let customers = getFromLocalStorage();
  // customers = customers.filter(
  //   (searchedCustomer) => searchedCustomer.id !== customer.id
  // );
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.DeleteCustomer,
  //   data: customers,
  // };
  // dispatcher.dispatch(payload);
};
