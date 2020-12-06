import {
  isListCustomersQuery,
  isCreateCustomersQuery,
  createCustomer,
  listCustomers,
} from "./customers";
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

  if (isCreateCustomersQuery(event)) {
    return await createCustomer(event.arguments.input);
  }
  return undefined;
};

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable import/prefer-default-export */
