import ThunkResult, { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import type { AppState } from "./rootReducer";
import { createAction } from "@reduxjs/toolkit";

const MILLISECONDS_PER_SECOND = 1000;

const ERROR_MESSAGE_TIMEOUT_SECONDS = 15;

type ThunkResult<R, A> = ThunkAction<R, AppState, A, AnyAction>;

export const loadingStart = createAction("loadingStart");
export const loadingFailed = createAction<Error>("loadingFailed");
export const loadingSucceeded = createAction("loadingSucceeded");
export const clearError = createAction("clearError");

export type ApiRequestFunction<A> = ((arg: A) => ThunkResult<void, A>) & {
  fulfilled: ReturnType<typeof createAction>;
};

export const apiRequestCreator = <R, A = void>(
  name: string,
  callback: (arg: A) => Promise<R>
): ApiRequestFunction<A> => {
  const finishAction = createAction<R>(`${name}/loading/complete`);

  return Object.assign(
    (arg: A): ThunkResult<void, A> => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      return async (dispatch) => {
        dispatch(loadingStart());
        try {
          const apiReturnVal = await callback(arg);
          dispatch(loadingSucceeded());
          return dispatch(finishAction(apiReturnVal));
        } catch (error) {
          setTimeout(() => {
            dispatch(clearError());
          }, ERROR_MESSAGE_TIMEOUT_SECONDS * MILLISECONDS_PER_SECOND);
          const dispatchError = error.errors ? error.errors[0] : error;
          return dispatch(loadingFailed(dispatchError.message));
        }
      };
    },
    { fulfilled: finishAction }
  );
};

export default apiRequestCreator;
