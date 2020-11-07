import dispatcher from "../appDispatcher";
import Customer from "../domain/Customer";

export enum ActionTypes {
  GetCustomers = "GetCustomers",
  CreateBlankCustomer = "CreateBlankCustomer",
  UpdateCustomer = "UpdateCustomer",
}

const customers: Customer[] = [];

type CustomerDispatchPayload = {
  actionTypes: ActionTypes;
  customers: Customer[];
};

export const getCustomers = () => {
  const payload: CustomerDispatchPayload = {
    actionTypes: ActionTypes.GetCustomers,
    customers,
  };
  dispatcher.dispatch(payload);
};

export const createBlankCustomer = () => {
  const payload: CustomerDispatchPayload = {
    actionTypes: ActionTypes.CreateBlankCustomer,
    customers: [
      {
        id: 1,
        name: "",
        email: "",
        daysPerWeek: 1,
        mealsPerDay: 1,
        plan: { name: "min", costPerMeal: 250 },
        allergicTo: [],
      },
    ],
  };
  dispatcher.dispatch(payload);
};

export const updateCustomer = (oldCustomer: Customer, customer: Customer) => {
  const payload: CustomerDispatchPayload = {
    actionTypes: ActionTypes.UpdateCustomer,
    customers: [oldCustomer, customer],
  };

  dispatcher.dispatch(payload);
};
