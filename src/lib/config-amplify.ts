import Amplify from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";

export const configAmplify = async (): Promise<void> => {
  const configResponse = await fetch(
    `${process.env.PUBLIC_URL}/backend-outputs.json`
  );
  const backendConfig = await configResponse.json();

  const stackConfigKey =
    Object.keys(backendConfig).find((key) => key.includes("BackendStack")) ??
    Object.keys(backendConfig).find((key) => key.includes("backend-stack")) ??
    ""

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
};
