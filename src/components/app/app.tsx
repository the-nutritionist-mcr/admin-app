import { AuthenticatedRoute, NavBar } from "..";
import { Box, Grommet, Main } from "grommet";
import { Notification, Spinning } from "grommet-controls";
import React from "react";
import { Switch } from "react-router-dom";

import UserContext from "../../lib/UserContext";
import { useApp } from "./hooks";
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

const LazyHome = React.lazy(async () => import("../../features/home/Home"));
const LazyCustomers = React.lazy(
  async () => import("../../features/customers/Customers")
);

const LazyRecipes = React.lazy(
  async () => import("../../features/recipes/Recipes")
);

const LazyPlanner = React.lazy(
  async () => import("../../features/planner/Planner")
);

const LazyExclusions = React.lazy(
  async () => import("../../features/exclusions/Exclusions")
);

const UnauthenticatedApp: React.FC = () => {
  const { user, error } = useApp();

  return (
    <UserContext.Provider value={user}>
      <Grommet theme={theme}>
        <NavBar />
        {error && <Notification status="error" message="Error" state={error} />}
        <Main pad={{ horizontal: "large", vertical: "medium" }}>
          <React.Suspense
            fallback={
              <Box alignSelf="center" pad={{ vertical: "large" }}>
                <Spinning size="large" />
              </Box>
            }
          >
            <Switch>
              <AuthenticatedRoute
                exact
                path="/"
                groups={["anonymous", "user", "admin"]}
              >
                <LazyHome />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/customers" groups={["user", "admin"]}>
                <LazyCustomers />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/recipes" groups={["user", "admin"]}>
                <LazyRecipes />
              </AuthenticatedRoute>

              <AuthenticatedRoute path="/planner" groups={["user", "admin"]}>
                <LazyPlanner />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/exclusions" groups={["user", "admin"]}>
                <LazyExclusions />
              </AuthenticatedRoute>
            </Switch>
          </React.Suspense>
        </Main>
      </Grommet>
    </UserContext.Provider>
  );
};

const App = withAuthenticator(UnauthenticatedApp);

export default App;
