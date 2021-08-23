/* eslint-disable @typescript-eslint/naming-convention */
import { Auth } from "@aws-amplify/auth";
import { assertIsBackendOutputs } from "types/BackendOutputs";
import { COGNITO_PASSWORD, COGNITO_USER } from "./constants";

export const loginToCognito = async (): Promise<string> => {
  const configResponse = await fetch(`/backend-outputs.json`);
  const rawConfig = await configResponse.json();

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
