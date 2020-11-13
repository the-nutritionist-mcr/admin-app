import dispatcher from "../appDispatcher";
import Customer, { Snack } from "../domain/Customer";
import { daysPerWeekOptions, plans } from "../lib/config";

export enum ActionTypes {
  GetCustomers = "GetCustomers",
  CreateBlankCustomer = "CreateBlankCustomer",
  UpdateCustomer = "UpdateCustomer",
  DeleteCustomer = "DeleteCustomer",
}

const LOCALSTORAGE_KEY = "TnmCustomers";

interface CustomerDispatchPayload {
  actionTypes: ActionTypes;
  customers: Customer[];
}

export const getCustomers = (): void => {
  const customers: Customer[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  );

  const payload: CustomerDispatchPayload = {
    actionTypes: ActionTypes.GetCustomers,
    customers,
  };
  dispatcher.dispatch(payload);
};

export const createBlankCustomer = (): void => {
  const customers: Customer[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  );

  const blankCustomer: Customer = {
    id: customers.length > 0 ? customers[customers.length - 1].id + 1 : 1,
    name: "",
    email: "",
    daysPerWeek: daysPerWeekOptions[0],
    plan: plans[0],
    snack: Snack.None,
    breakfast: false,
    allergicTo: [],
  };

  customers.push(blankCustomer);

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));

  const payload: CustomerDispatchPayload = {
    actionTypes: ActionTypes.CreateBlankCustomer,
    customers,
  };

  dispatcher.dispatch(payload);
};

export const updateCustomer = (oldCustomer: Customer, customer: Customer) => {
  const customers: Customer[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  );

  const index = customers.findIndex(
    (customer) => customer.id === oldCustomer.id
  );
  customers[index] = customer;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));

  const payload: CustomerDispatchPayload = {
    actionTypes: ActionTypes.UpdateCustomer,
    customers,
  };

  dispatcher.dispatch(payload);
};

export const deleteCustomer = (customer: Customer) => {
  let customers: Customer[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
  );

  customers = customers.filter(
    (searchedCustomer) => searchedCustomer.id !== customer.id
  );
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));

  const payload: CustomerDispatchPayload = {
    actionTypes: ActionTypes.DeleteCustomer,
    customers,
  };

  dispatcher.dispatch(payload);
};
