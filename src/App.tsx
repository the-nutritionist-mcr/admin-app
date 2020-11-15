import { Grommet, Main } from "grommet";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Customers from "./pages/Customers";
import Exclusions from "./pages/Exclusions";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Planner from "./pages/Planner";
import React from "react";
import Recipes from "./pages/Recipes";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14pt",
      height: "20px",
    },
  },
};

const App: React.FC = () => {
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
            <Route path="/exclusions">
              <Exclusions />
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
