import { Grommet, Main } from "grommet";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import React from "react";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14pt",
      height: "20px",
    },
  },
};

interface LoadableRoute {
  path: string;
  route: React.FC;
}

const App: React.FC = () => {
  const [routes, setRoutes] = React.useState<LoadableRoute[]>([]);

  React.useEffect(() => {
    (async (): Promise<void> => {
      setRoutes([
        {
          path: "/customers",
          route: (await import("./pages/Customers")).default,
        },
        {
          path: "/recipes",
          route: (await import("./pages/Recipes")).default,
        },
        {
          path: "/exclusions",
          route: (await import("./pages/Exclusions")).default,
        },
        {
          path: "/planner",
          route: (await import("./pages/Planner")).default,
        },
      ]);
    })();
  }, []);

  return (
    <Grommet theme={theme}>
      <Router>
        <NavBar />
        <Main pad={{ horizontal: "large", vertical: "medium" }}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            {routes.map((route, index) => (
              <Route key={index} path={route.path}>
                {React.createElement(route.route)}
              </Route>
            ))}
          </Switch>
        </Main>
      </Router>
    </Grommet>
  );
};

export default App;
