import "./index.css";

import Amplify, { Auth } from "aws-amplify";
import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "./lib/UserContext";
import config from "./aws-exports";
import reportWebVitals from "./reportWebVitals";
import store from "./lib/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUser = async (): Promise<any> => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }
};

const render = async (): Promise<void> => {
  Amplify.configure(config);

  const user = await getUser();

  ReactDOM.render(
    <React.StrictMode>
      <UserContext.Provider value={user}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </UserContext.Provider>
    </React.StrictMode>,
    document.querySelector("#root")
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

render();
