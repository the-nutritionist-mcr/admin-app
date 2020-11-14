import ActionType from "./types/ActionType";

export interface DispatchPayload {
  actionType: ActionType;
  data: unknown;
}

import { Dispatcher } from "flux";
const appDispatcher = new Dispatcher<DispatchPayload>();
export default appDispatcher;
