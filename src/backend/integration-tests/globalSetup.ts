import { CognitoIdentityServiceProvider } from "aws-sdk";
import { COGNITO_PASSWORD, COGNITO_USER } from "./constants";

const globalSetup = async () => {
  const rawConfig = (await import(`${process.cwd()}/backend-outputs.json`))
    .default;

  const config: any = Object.entries(rawConfig).find(([key]) =>
    key.includes("backend-stack")
  )?.[1];

  if (!config) {
    throw new Error("No backend config was found...");
  }

  const cognito = new CognitoIdentityServiceProvider({ region: "us-east-1" });

  const createUserParams = {
    UserPoolId: config.UserPoolId,
    Username: COGNITO_USER,
    TemporaryPassword: "123.123.aA",
    MessageAction: "SUPPRESS",
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: [
      {
        Name: "email_verified",
        Value: "True",
      },
      {
        Name: "phone_number_verified",
        Value: "True",
      },
      {
        Name: "phone_number",
        Value: "+4478910123123"
      },
      {
        Name: "email",
        Value: "a@b.c",
      },
    ],
  };

  await cognito.adminCreateUser(createUserParams).promise();

  const setPasswordParams = {
    Password: COGNITO_PASSWORD,
    Permanent: true,
    Username: COGNITO_USER,
    UserPoolId: config.UserPoolId,
  };

  await cognito.adminSetUserPassword(setPasswordParams).promise();
}

export default globalSetup;
