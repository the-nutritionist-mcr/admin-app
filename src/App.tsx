import { Auth, Hub } from "aws-amplify";
import { Grommet, Main } from "grommet";
import { Route, Switch, useLocation } from "react-router-dom";
import { getPages, getRoutePath } from "./pages";

import LoadableRoute from "./types/LoadableRoute";
import NavBar from "./components/NavBar";
import { Notification } from "grommet-controls";
import React from "react";
import UserContext from "./lib/UserContext";
import { errorSelector } from "./lib/rootReducer";
import { fetchCustomers } from "./features/customers/customersSlice";
import { fetchExclusions } from "./features/exclusions/exclusionsSlice";
import store from "./lib/store";
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
  // eslint-disable-next-line unicorn/no-useless-undefined
  const [user, setUser] = React.useState<any>(undefined); // eslint-disable-line @typescript-eslint/no-explicit-any
  const error = useSelector(errorSelector);
  const location = useLocation();

  const pages = React.useMemo(
    () =>
      getPages([
        "anonymous",
        ...(user?.signInUserSession?.accessToken?.payload["cognito:groups"] ??
          []),
      ]),
    [user]
  );

  React.useEffect(() => {
    const currentRoute = pages.find(
      (route) => route.path === location.pathname
    );
    const otherRoutes = pages.filter(
      (route) => route.path !== location.pathname
    );

    const listener = Hub.listen(
      "auth",
      async (): Promise<void> => {
        setUser(await getUser());
      }
    );

    (async (): Promise<void> => {
      if (currentRoute && routes.length === 0) {
        setUser(await getUser());
        await Promise.all([
          store.dispatch(fetchCustomers()),
          store.dispatch(fetchExclusions()),
        ]);
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
    return (): void => Hub.remove("auth", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes.length, pages]);

  return (
    <UserContext.Provider value={user}>
      <Grommet theme={theme}>
        <NavBar routes={routes} />
        {error && <Notification status="error" message="Error" state={error} />}
        <Main pad={{ horizontal: "large", vertical: "medium" }}>
          <Switch>
            {routes.map(
              (route, index) =>
                route.resolvedRoute && (
                  <Route
                    exact={route.exact}
                    key={index}
                    path={getRoutePath(route)}
                  >
                    {React.createElement(route.resolvedRoute)}
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
