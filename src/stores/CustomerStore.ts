import { ActionTypes } from "../actions/customers";
import Customer from "../domain/Customer";
import { EventEmitter } from "events";

import dispatcher from "../appDispatcher";
const CHANGE_EVENT = "change";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void;

// eslint-disable-next-line fp/no-let
let customers: Customer[] = [];

class CustomerStore extends EventEmitter {
  public addChangeListener(callback: Callback): void {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: Callback): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  public getCustomers(): Customer[] {
    return customers;
  }
}

const customerStore = new CustomerStore();

dispatcher.register((payload) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payloadAsAny = payload as any;

  switch (payloadAsAny.actionTypes) {
    case ActionTypes.GetCustomers:
    case ActionTypes.CreateBlankCustomer:
    case ActionTypes.UpdateCustomer:
    case ActionTypes.DeleteCustomer:
      customers = payloadAsAny.customers;
      customerStore.emitChange();
      break;
  }
});

export default customerStore;
