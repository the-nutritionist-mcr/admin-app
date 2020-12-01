import { Auth, Hub } from "aws-amplify";
import { Grommet, Main } from "grommet";
import { Notification, Spinning } from "grommet-controls";
import { Route, Switch, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar";
import React from "react";
import UserContext from "./lib/UserContext";
import { errorSelector } from "./lib/rootReducer";
// Import { fetchCustomers } from "./features/customers/customersSlice";
// Import { fetchExclusions } from "./features/exclusions/exclusionsSlice";
// Import store from "./lib/store";
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

const LazyHome = React.lazy(async () => import("./features/home/Home"));
const LazyCustomers = React.lazy(
  async () => import("./features/customers/Customers")
);

const LazyRecipes = React.lazy(
  async () => import("./features/recipes/Recipes")
);

const LazyPlanner = React.lazy(
  async () => import("./features/planner/Planner")
);

const LazyExclusions = React.lazy(
  async () => import("./features/exclusions/Exclusions")
);

const UnauthenticatedApp: React.FC = () => {
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
    })();
    return (): void => Hub.remove("auth", listener);
  }, [location.pathname, user]);

  return (
    <UserContext.Provider value={user}>
      <Grommet theme={theme}>
        <NavBar />
        {error && <Notification status="error" message="Error" state={error} />}
        <Main pad={{ horizontal: "large", vertical: "medium" }}>
          <React.Suspense fallback={<Spinning size="large" />}>
            <Switch>
              <Route path="/">
                <LazyHome />
              </Route>
              <Route path="/customers">
                <LazyCustomers />
              </Route>
              <Route path="/recipes">
                <LazyRecipes />
              </Route>

              <Route path="/planner">
                <LazyPlanner />
              </Route>
              <Route path="/exclusions">
                <LazyExclusions />
              </Route>
            </Switch>
          </React.Suspense>
        </Main>
      </Grommet>
    </UserContext.Provider>
  );
};

const App = withAuthenticator(UnauthenticatedApp);

export default App;
