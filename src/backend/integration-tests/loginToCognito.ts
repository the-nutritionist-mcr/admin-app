import { Auth } from "@aws-amplify/auth";
import { COGNITO_PASSWORD, COGNITO_USER } from "./constants";

export const loginToCognito = async () => {
  const rawConfig = (await import(`${process.cwd()}/backend-outputs.json`))
    .default;

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
