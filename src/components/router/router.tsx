import { AuthenticatedRoute } from "..";
import { Box } from "grommet";
import React from "react";
import { Spinning } from "grommet-controls";
import { Switch } from "react-router-dom";
import { CustomersQuery } from "../../features/customers/Customers";
import { RecipesQuery } from "../../features/recipes/Recipes";

// const LazyPlanner = React.lazy(
//   async () => import("../../features/planner/Planner")
// );

// const LazyExclusions = React.lazy(
//   async () => import("../../features/exclusions/Exclusions")
// );

// const LazyNewCustomer = React.lazy(
//   async () => import("../../features/customers/NewCustomerPage")
// );

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
        lazyImport={() => import("../home/home")}
      />
      <AuthenticatedRoute
        path="/customers"
        groups={["user", "admin"]}
        lazyImport={() => import("../../features/customers/Customers")}
        dataQuery={CustomersQuery}
      />
      <AuthenticatedRoute
        path="/recipes"
        groups={["user", "admin"]}
        lazyImport={() => import("../../features/recipes/Recipes")}
        dataQuery={RecipesQuery}
      />
      {/*
      <AuthenticatedRoute
        path="/planner"
        groups={["user", "admin"]}
        component={LazyPlanner}
      />
      <AuthenticatedRoute
        path="/customisations"
        groups={["user", "admin"]}
        component={LazyExclusions}
      />
      <AuthenticatedRoute
        path="/edit-customer/:id"
        groups={["user", "admin"]}
        component={LazyNewCustomer}
      />
      <AuthenticatedRoute
        path="/new-customer"
        groups={["user", "admin"]}
        component={LazyNewCustomer}
      />
      */}
    </Switch>
  </React.Suspense>
);

export default Router;
