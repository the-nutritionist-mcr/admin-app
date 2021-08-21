/* eslint-disable @typescript-eslint/naming-convention */
import { Auth } from "@aws-amplify/auth";
import { COGNITO_PASSWORD, COGNITO_USER } from "./constants";

export const loginToCognito = async (): Promise<string> => {
  const rawConfig = (await import(`${process.cwd()}/backend-outputs.json`))
    .default;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = Object.entries(rawConfig).find(([key]) =>
    key.includes("backend-stack")
  )?.[1];

  Auth.configure({
    Auth: {
      region: "us-east-1",
      userPoolId: config.UserPoolId,
      userPoolWebClientId: config.ClientId,
    },
  });

  const signIn = await Auth.signIn({ username: COGNITO_USER, password: COGNITO_PASSWORD })
  
  return signIn.signInUserSession.accessToken.jwtToken
}
