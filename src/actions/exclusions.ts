import dispatcher, { DispatchPayload } from "../appDispatcher";
import ActionType from "../types/ActionType";
import Exclusion from "../domain/Exclusion";

const LOCALSTORAGE_KEY = "TnmExclusions";

export const getExclusions = (): void => {
  const exclusions: Exclusion[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  );

  const payload: DispatchPayload = {
    actionType: ActionType.GetExclusions,
    data: exclusions,
  };
  dispatcher.dispatch(payload);
};

export const createBlankExclusion = (): void => {
  // const exclusions: Exclusion[] = JSON.parse(
  //   localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  // );
  // const blankExclusion: Exclusion = {
  //   id: exclusions.length > 0 ? exclusions[exclusions.length - 1].id + 1 : 1,
  //   name: "",
  //   allergen: false,
  // };
  // exclusions.push(blankExclusion);
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(exclusions));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.CreateBlankExclusion,
  //   data: exclusions,
  // };
  // dispatcher.dispatch(payload);
};

export const updateExclusion = (
  oldExclusion: Exclusion,
  exclusion: Exclusion
): void => {
  // const exclusions: Exclusion[] = JSON.parse(
  //   localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  // );
  // const index = exclusions.findIndex(
  //   (exclusionAtPosition) => exclusionAtPosition.id === oldExclusion.id
  // );
  // exclusions[index] = exclusion;
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(exclusions));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.UpdateExclusion,
  //   data: exclusions,
  // };
  // dispatcher.dispatch(payload);
};

export const deleteExclusion = (customer: Exclusion): void => {
  // // eslint-disable-next-line fp/no-let
  // let exclusions: Exclusion[] = JSON.parse(
  //   localStorage.getItem(LOCALSTORAGE_KEY) ?? "[]"
  // );
  // exclusions = exclusions.filter(
  //   (searchedExclusion) => searchedExclusion.id !== customer.id
  // );
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(exclusions));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.DeleteExclusion,
  //   data: exclusions,
  // };
  // dispatcher.dispatch(payload);
};
