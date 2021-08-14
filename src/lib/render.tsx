import { App } from "../components";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import log from "loglevel";
import reportWebVitals from "../reportWebVitals";
import store from "../lib/store";
import { withAuthenticator } from "@aws-amplify/ui-react";
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

const render = (): void => {
  log.trace("Beginning initial render");
  const AuthenticatedApp = withAuthenticator(App);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <AuthenticatedApp />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.querySelector("#root")
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

export default render;
