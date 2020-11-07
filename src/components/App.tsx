import React from "react";
import Customers from "./Customers";
import Recipes from "./Recipes";
import Planner from "./Planner";
import Home from "./Home";
import { majorScale, Pane } from "evergreen-ui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Pane
          elevation={1}
          paddingLeft={majorScale(2)}
          paddingRight={majorScale(2)}
          paddingTop={majorScale(2)}
          paddingBottom={majorScale(2)}
        >
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
        </Pane>
      </Router>
    </React.Fragment>
  );
};

export default App;
