import { AppSyncResolverHandler } from "aws-lambda";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */

export const handler: AppSyncResolverHandler<any, any> = async () => {
  return "foo";
};

/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/require-await */
/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable import/prefer-default-export */
