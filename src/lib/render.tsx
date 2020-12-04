import Amplify, { Auth } from "aws-amplify";
import { App } from "../components";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import config from "../aws-exports";
import reportWebVitals from "../reportWebVitals";
import store from "../lib/store";
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(config);
Auth.configure(config);

const render = (): void => {
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
