import { AuthenticatedRoute } from "..";
import { Box } from "grommet";
import React from "react";
import { Spinning } from "grommet-controls";
import { Switch } from "react-router-dom";

const LazyHome = React.lazy(async () => import("../home/home"));
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

const Router: React.FC = () => (
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
      <AuthenticatedRoute path="/customisations" groups={["user", "admin"]}>
        <LazyExclusions />
      </AuthenticatedRoute>
    </Switch>
  </React.Suspense>
);

export default Router;
