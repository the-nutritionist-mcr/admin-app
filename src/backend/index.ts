import { isListCustomersQuery, listCustomers } from "./list-customers";
import { AllQueryVariables } from "./query-variables-types";
import { AppSyncResolverHandler } from "aws-lambda";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

export const handler: AppSyncResolverHandler<AllQueryVariables, any> = async (
  event
) => {
  if (isListCustomersQuery(event)) {
    return await listCustomers();
  }
};

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable import/prefer-default-export */
