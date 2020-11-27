import "./index.css";

import Amplify from "aws-amplify";
import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import config from "./aws-exports";
import { fetchCustomers } from "./features/customers/customersSlice";
import { fetchExclusions } from "./features/exclusions/exclusionsSlice";
import reportWebVitals from "./reportWebVitals";
import store from "./lib/store";

const render = async (): Promise<void> => {
  Amplify.configure(config);

  await Promise.all([
    store.dispatch(fetchCustomers()),
    store.dispatch(fetchExclusions()),
  ]);

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
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

render();
