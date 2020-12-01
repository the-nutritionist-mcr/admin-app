import { Auth, Hub } from "aws-amplify";
import { Grommet, Main } from "grommet";
import { Route, Switch, useLocation } from "react-router-dom";
import { getRoutePath, loadPages } from "./pages";

import LoadableRoute from "./types/LoadableRoute";
import NavBar from "./components/NavBar";
import { Notification } from "grommet-controls";
import React from "react";
import UserContext from "./lib/UserContext";
import { errorSelector } from "./lib/rootReducer";
import { fetchCustomers } from "./features/customers/customersSlice";
import { fetchExclusions } from "./features/exclusions/exclusionsSlice";
import store from "./lib/store";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useSelector } from "react-redux";
import { withAuthenticator } from "@aws-amplify/ui-react";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14pt",
      height: "20px",
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUser = async (): Promise<any> => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }
};

const UnauthenticatedApp: React.FC = () => {
  const [routes, setRoutes] = React.useState<LoadableRoute[]>([]);
  const [user, setUser] = React.useState<any>({}); // eslint-disable-line @typescript-eslint/no-explicit-any
  const error = useSelector(errorSelector);
  const location = useLocation();

  useDeepCompareEffect(() => {
    const listener = Hub.listen(
      "auth",
      async (): Promise<void> => {
        setUser(await getUser());
      }
    );

    (async (): Promise<void> => {
      setUser(await getUser());
      await Promise.all([
        store.dispatch(fetchCustomers()),
        store.dispatch(fetchExclusions()),
      ]);

      const groups = [
        "anonymous",
        ...(user?.signInUserSession?.accessToken?.payload["cognito:groups"] ??
          []),
      ];

      const pages = loadPages(location.pathname, groups);
      const currentRoute = pages.currentRoute;
      if (currentRoute) {
        currentRoute.loadedRoute = (await currentRoute?.loadingRoute)?.default;
        setRoutes([currentRoute]);
      }

      pages.otherRoutes = await Promise.all(
        pages.otherRoutes.map(async (route) => ({
          ...route,
          loadedRoute: (await route.loadingRoute)?.default,
        }))
      );
      setRoutes(
        currentRoute ? [currentRoute, ...pages.otherRoutes] : pages.otherRoutes
      );
    })();
    return (): void => Hub.remove("auth", listener);
  }, [location.pathname, user]);

  return (
    <UserContext.Provider value={user}>
      <Grommet theme={theme}>
        <NavBar routes={routes} />
        {error && <Notification status="error" message="Error" state={error} />}
        <Main pad={{ horizontal: "large", vertical: "medium" }}>
          <Switch>
            {routes.map(
              (route, index) =>
                route.loadedRoute && (
                  <Route
                    exact={route.exact}
                    key={index}
                    path={getRoutePath(route)}
                  >
                    {React.createElement(route.loadedRoute)}
                  </Route>
                )
            )}
          </Switch>
        </Main>
      </Grommet>
    </UserContext.Provider>
  );
};

const App = withAuthenticator(UnauthenticatedApp);

export default App;
