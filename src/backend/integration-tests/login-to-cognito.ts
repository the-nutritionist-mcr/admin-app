/* eslint-disable @typescript-eslint/naming-convention */
import { Auth } from "@aws-amplify/auth";
import { assertIsBackendOutputs } from "../../types/backend-outputs";
import {
  COGNITO_PASSWORD,
  COGNITO_USER,
} from "../../../cypress/support/constants";

export const loginToCognito = async (): Promise<string> => {
  const rawConfig = (await import(`${process.cwd()}/backend-outputs.json`))
    .default;

  assertIsBackendOutputs(rawConfig);

  const config = Object.entries(rawConfig).find(([key]) =>
    key.includes("backend-stack")
  )?.[1];

  if (!config) {
    throw new Error("Could not load backend config :-(");
  }

  Auth.configure({
    Auth: {
      region: "us-east-1",
      userPoolId: config.UserPoolId,
      userPoolWebClientId: config.ClientId,
    },
  });

  const signIn = await Auth.signIn({
    username: COGNITO_USER,
    password: COGNITO_PASSWORD,
  });

  return signIn.signInUserSession.accessToken.jwtToken;
};
