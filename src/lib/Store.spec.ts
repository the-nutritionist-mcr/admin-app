import ActionType from "../types/ActionType";
import { DispatchPayload } from "../appDispatcher";
import { Dispatcher } from "flux";
import Store from "./Store";

describe("The Store", () => {
  interface DataType {
    id: number;
  }

  it("Executes all registered callbacks when you emit a change", () => {
    const dispatcher = new Dispatcher<DispatchPayload>();
    const store = new Store<DataType>(dispatcher, jest.fn());
    const changeListener = jest.fn();
    store.addChangeListener(changeListener);
    store.emitChange();
    expect(changeListener).toHaveBeenCalledTimes(1);
  });

  it("Doesn't execute callbacks that have been removed", () => {
    const dispatcher = new Dispatcher<DispatchPayload>();
    const store = new Store<DataType>(dispatcher, jest.fn());
    const changeListener = jest.fn();
    store.addChangeListener(changeListener);
    store.removeChangeListener(changeListener);
    store.emitChange();
    expect(changeListener).not.toHaveBeenCalled();
  });

  it("Receives the dispatch data into the payloadHandler when a dispatch is issued", () => {
    const dispatcher = new Dispatcher<DispatchPayload>();

    const dispatchHandler = jest.fn();

    // eslint-disable-next-line no-new
    new Store<DataType>(dispatcher, dispatchHandler);

    const payload = {
      actionType: ActionType.GetCustomers,
      data: {
        key: "value",
      },
    };

    dispatcher.dispatch(payload);

    expect(dispatchHandler).toHaveBeenCalledWith(payload);
  });

  it("Stores the returned data and emits a change event using the payloadHandler when a dispatch is issued", () => {
    const dispatcher = new Dispatcher<DispatchPayload>();

    const store = new Store<DataType>(dispatcher, () => [{ id: 7 }, { id: 4 }]);

    const changeListener = jest.fn();
    store.addChangeListener(changeListener);

    dispatcher.dispatch({
      actionType: ActionType.GetCustomers,
      data: {},
    });

    const data = store.getAll();

    expect(data).toHaveLength(2);
    expect(data[0].id).toEqual(7);
    expect(data[1].id).toEqual(4);
    expect(changeListener).toHaveBeenCalled();
  });

  it("Makes no change to data if payloadHandler returns null", () => {
    const dispatcher = new Dispatcher<DispatchPayload>();

    const store = new Store<DataType>(
      dispatcher,
      (payload) => payload.data as DataType[]
    );

    const changeListener = jest.fn();
    store.addChangeListener(changeListener);

    const dataToSend = [{ id: 3 }, { id: 7 }];

    dispatcher.dispatch({
      actionType: ActionType.GetCustomers,
      data: dataToSend,
    });

    dispatcher.dispatch({
      actionType: ActionType.GetCustomers,
      data: null,
    });

    const data = store.getAll();

    expect(data).toHaveLength(2);
    expect(data[0].id).toEqual(3);
    expect(data[1].id).toEqual(7);
    expect(changeListener).toHaveBeenCalled();
  });

  describe("get by id", () => {
    it("returns the appropriate data item by id or undefined if not found", () => {
      const dispatcher = new Dispatcher<DispatchPayload>();

      const dataItemSeven = { id: 7 };
      const dataItemFour = { id: 4 };

      const store = new Store<DataType>(dispatcher, () => [
        dataItemSeven,
        dataItemFour,
      ]);

      dispatcher.dispatch({
        actionType: ActionType.GetCustomers,
        data: {},
      });

      const idSeven = store.getById(7);
      expect(idSeven).toEqual(dataItemSeven);

      const idFour = store.getById(4);
      expect(idFour).toEqual(dataItemFour);

      const notFound = store.getById(10);
      expect(notFound).toBeUndefined();
    });
  });
});
