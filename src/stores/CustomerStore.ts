import { EventEmitter } from "events";
import Customer from "../domain/Customer";
import dispatcher from "../appDispatcher";
import { ActionTypes } from "../actions/customers";

const CHANGE_EVENT = "change";

type Callback = (...args: any[]) => void;

let customers: Customer[] = [];

class CustomerStore extends EventEmitter {
  public addChangeListener(callback: Callback) {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: Callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCustomers() {
    return customers;
  }
}

const store = new CustomerStore();

dispatcher.register((payload) => {
  const payloadAsAny = payload as any;

  switch (payloadAsAny.actionTypes) {
    case ActionTypes.GetCustomers:
    case ActionTypes.CreateBlankCustomer:
    case ActionTypes.UpdateCustomer:
      customers = payloadAsAny.customers;
      store.emitChange();
      break;
  }
});

export default store;
