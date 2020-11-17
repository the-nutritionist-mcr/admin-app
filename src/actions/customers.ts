import Customer, { Snack } from "../domain/Customer";
import { daysPerWeekOptions, plans } from "../lib/config";
import dispatcher, { DispatchPayload } from "../appDispatcher";
import ActionType from "../types/ActionType";

const LOCALSTORAGE_KEY = "TnmCustomers";

export const getCustomers = (): void => {
  const customers: Customer[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  );

  const payload: DispatchPayload = {
    actionType: ActionType.GetCustomers,
    data: customers.map((customer) => ({
      ...customer,

      pauseStart:
        typeof customer.pauseStart === "string"
          ? new Date(customer.pauseStart)
          : customer.pauseStart,

      pauseEnd:
        typeof customer.pauseEnd === "string"
          ? new Date(customer.pauseEnd)
          : customer.pauseEnd,
    })),
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
    exclusions: [],
  };

  customers.push(blankCustomer);

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));

  const payload: DispatchPayload = {
    actionType: ActionType.CreateBlankCustomer,
    data: customers,
  };

  dispatcher.dispatch(payload);
};

export const updateCustomer = (
  oldCustomer: Customer,
  customer: Customer
): void => {
  const customers: Customer[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  );

  const index = customers.findIndex(
    (customerAtPosition) => customerAtPosition.id === oldCustomer.id
  );
  customers[index] = customer;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));

  const payload: DispatchPayload = {
    actionType: ActionType.UpdateCustomer,
    data: customers,
  };

  dispatcher.dispatch(payload);
};

export const deleteCustomer = (customer: Customer): void => {
  // eslint-disable-next-line fp/no-let
  let customers: Customer[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  );

  customers = customers.filter(
    (searchedCustomer) => searchedCustomer.id !== customer.id
  );
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));

  const payload: DispatchPayload = {
    actionType: ActionType.DeleteCustomer,
    data: customers,
  };

  dispatcher.dispatch(payload);
};
