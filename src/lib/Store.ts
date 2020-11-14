import { DispatchPayload } from "../appDispatcher";
import { Dispatcher } from "flux";
import { EventEmitter } from "events";

type IdType = number;

const CHANGE_EVENT = "ChangeEvent";

type ChangeCallback = (...args: unknown[]) => void;

type PayloadHandler<D extends { id: IdType }> = (
  payload: DispatchPayload
) => D[] | null;

export default class Store<T extends { id: IdType }> {
  private data: T[] = [];

  private readonly events = new EventEmitter();

  private payloadHandler: PayloadHandler<T>;

  public constructor(
    dispatcher: Dispatcher<DispatchPayload>,
    payloadHandler: PayloadHandler<T>
  ) {
    this.payloadHandler = payloadHandler;

    dispatcher.register((payload) => {
      this.data = this.payloadHandler(payload) ?? this.data;
      this.emitChange();
    });
  }

  public addChangeListener(callback: ChangeCallback): void {
    this.events.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: ChangeCallback): void {
    this.events.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange(): void {
    this.events.emit(CHANGE_EVENT);
  }

  public getAll(): T[] {
    return this.data;
  }

  public getById(id: number): T | undefined {
    return this.data.find((item) => item.id === id);
  }
}
