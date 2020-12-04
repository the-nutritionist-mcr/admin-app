import ThunkResult, { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import type { AppState } from "./rootReducer";
import { createAction } from "@reduxjs/toolkit";

type ThunkResult<R, A> = ThunkAction<R, AppState, A, AnyAction>;

export const loadingFinish = createAction("loadingIdle");
export const loadingStart = createAction("loadingStart");
export const loadingFailed = createAction<Error>("loadingFailed");
export const loadingSucceeded = createAction("loadingSucceeded");

type ApiRequestFunction<A> = ((arg?: A) => ThunkResult<void, A>) & {
  fulfilled: ReturnType<typeof createAction>;
};

export const apiRequestCreator = <R, A = undefined>(
  name: string,
  callback: (arg?: A) => Promise<R>
): ApiRequestFunction<A> => {
  const finishAction = createAction<R>(`${name}/loading/complete`);

  return Object.assign(
    (arg?: A): ThunkResult<void, A> => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      return async (dispatch) => {
        dispatch(loadingStart());
        try {
          const apiReturnVal = await callback(arg);
          dispatch(loadingSucceeded());
          return dispatch(finishAction(apiReturnVal));
        } catch (error) {
          return dispatch(loadingFailed(error));
        }
      };
    },
    { fulfilled: finishAction }
  );
};

export default apiRequestCreator;
