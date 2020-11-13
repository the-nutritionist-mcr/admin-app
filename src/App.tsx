import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";
import Customers from "./pages/Customers";
import Recipes from "./pages/Recipes";
import Planner from "./pages/Planner";
import { Grommet, Main } from "grommet";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14pt",
      height: "20px",
    },
  },
};

const App = () => {
  return (
    <Grommet theme={theme}>
      <Router>
        <NavBar />
        <Main pad={{ horizontal: "small", vertical: "medium" }}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/recipes">
              <Recipes />
            </Route>
            <Route path="/planner">
              <Planner />
            </Route>
          </Switch>
        </Main>
      </Router>
    </Grommet>
  );
};

export default App;
