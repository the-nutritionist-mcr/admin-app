import Amplify from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import backendConfig from "../backend-outputs.json";

const stackConfigKey =
  Object.keys(backendConfig).find((key) => key.includes("BackendStack")) ?? "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const configObject = (backendConfig as any)[stackConfigKey];

const config = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Auth: {
    mandatorySignIn: true,
    region: "us-east-1",
    userPoolId: configObject.UserPoolId,
    userPoolWebClientId: configObject.ClientId,
  },
  aws_appsync_graphqlEndpoint: configObject.GraphQlQpiUrl,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  graphql_endpoint_iam_region: "us-east-1",
  /* eslint-enable @typescript-eslint/naming-convention */
};

Amplify.configure(config);
Auth.configure(config);
