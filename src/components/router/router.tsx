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

const LazyNewCustomer = React.lazy(
  async () => import("../../features/customers/NewCustomerPage")
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
        component={LazyHome}
      />
      <AuthenticatedRoute path="/customers" groups={["user", "admin"]} component={LazyCustomers} />
      <AuthenticatedRoute path="/recipes" groups={["user", "admin"]} component={LazyRecipes} />
      <AuthenticatedRoute path="/planner" groups={["user", "admin"]} component={LazyPlanner} />
      <AuthenticatedRoute path="/customisations" groups={["user", "admin"]} component={LazyExclusions} />
      <AuthenticatedRoute path="/edit-customer/:id" groups={["user", "admin"]} component={LazyNewCustomer} />
      <AuthenticatedRoute path="/new-customer" groups={["user", "admin"]} component={LazyNewCustomer} />
    </Switch>
  </React.Suspense>
);

export default Router;
