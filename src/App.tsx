import { Grommet, Main } from "grommet";
import { Route, Switch, useLocation } from "react-router-dom";

import LoadableRoute from "./types/LoadableRoute";
import NavBar from "./components/NavBar";
import React from "react";
import pages from "./pages";

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
  const [routes, setRoutes] = React.useState<LoadableRoute[]>([]);
  const location = useLocation();

  React.useEffect(() => {
    const currentRoute = pages.find(
      (route) => route.path === location.pathname
    );
    const otherRoutes = pages.filter(
      (route) => route.path !== location.pathname
    );

    (async (): Promise<void> => {
      if (currentRoute && routes.length === 0) {
        currentRoute.resolvedRoute = (await currentRoute.route).default;
        setRoutes([currentRoute, ...routes]);
      }

      if (routes.length > 0 && routes.length !== pages.length) {
        const otherRoutesResolved = await Promise.all(
          otherRoutes.map(async (route) => ({
            ...route,
            resolvedRoute: (await route.route).default,
          }))
        );
        setRoutes([...otherRoutesResolved, ...routes]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes.length]);

  return (
    <Grommet theme={theme}>
      <NavBar />
      <Main pad={{ horizontal: "large", vertical: "medium" }}>
        <Switch>
          {routes.map(
            (route, index) =>
              route.resolvedRoute && (
                <Route exact={route.exact} key={index} path={route.path}>
                  {React.createElement(route.resolvedRoute)}
                </Route>
              )
          )}
        </Switch>
      </Main>
    </Grommet>
  );
};

export default App;
