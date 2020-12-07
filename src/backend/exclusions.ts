import * as database from "./database";
import {
  AllQueryVariables,
  ListExclusionsQueryVariables,
} from "./query-variables-types";
import { AppSyncResolverEvent } from "aws-lambda";
import Exclusion from "../domain/Exclusion";

export const isListExclusionsQuery = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<ListExclusionsQueryVariables> => {
  return event.info.fieldName === "listExclusions";
};

export const listExclusions = async (): Promise<Exclusion[]> => {
  const EXCLUSIONS_TABLE_NOT_SET = "process.env.EXCLUSIONS_TABLE name not set!";

  const exclusionsTable = process.env.EXCLUSIONS_TABLE;
  if (!exclusionsTable) {
    throw new Error(EXCLUSIONS_TABLE_NOT_SET);
  }

  return ((await database.getAll(exclusionsTable)) as unknown) as Exclusion[];
};
