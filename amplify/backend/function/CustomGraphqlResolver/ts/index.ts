import { AppSyncResolverHandler } from "aws-lambda";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/prefer-default-export
export const handler: AppSyncResolverHandler<any, any> = async (
  event,
  context
) => {
  return JSON.stringify({
    event,
    context,
  });
};
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/require-await */
/* eslint-enable @typescript-eslint/no-unused-vars */
