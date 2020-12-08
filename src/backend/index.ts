import {
  createCustomer,
  deleteCustomer,
  isCreateCustomersQuery,
  isDeleteCustomerMutation,
  isListCustomersQuery,
  isUpdateCustomerMutation,
  listCustomers,
  updateCustomer,
} from "./customers";
import {
  createExclusion,
  isCreateExclusionMutation,
  isListExclusionsQuery,
  listExclusions,
} from "./exclusions";

import { AllQueryVariables } from "./query-variables-types";
import { AppSyncResolverHandler } from "aws-lambda";

type ExtractPromiseType<P> = P extends Promise<infer T> ? T : never;

type Result =
  | ExtractPromiseType<ReturnType<typeof listCustomers>>
  | ExtractPromiseType<ReturnType<typeof createCustomer>>
  | ExtractPromiseType<ReturnType<typeof deleteCustomer>>
  | ExtractPromiseType<ReturnType<typeof updateCustomer>>
  | ExtractPromiseType<ReturnType<typeof listExclusions>>
  | ExtractPromiseType<ReturnType<typeof createExclusion>>;

/* eslint-disable import/prefer-default-export */
export const handler: AppSyncResolverHandler<
  AllQueryVariables,
  Result
> = async (event) => {
  if (isListCustomersQuery(event)) {
    return await listCustomers();
  }

  if (isCreateCustomersQuery(event)) {
    return await createCustomer(event.arguments.input);
  }

  if (isDeleteCustomerMutation(event)) {
    return await deleteCustomer(event.arguments.input);
  }

  if (isUpdateCustomerMutation(event)) {
    return await updateCustomer(event.arguments.input);
  }

  if (isListExclusionsQuery(event)) {
    return await listExclusions();
  }

  if (isCreateExclusionMutation(event)) {
    return await createExclusion(event.arguments.input);
  }
  throw new Error(`Resolver cannot handle '${event.info.fieldName}'`);
};

/* eslint-enable import/prefer-default-export */
