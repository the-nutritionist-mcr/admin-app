import { AuthenticatedRoute } from "..";
import { Box } from "grommet";
import React from "react";
import { Spinning } from "grommet-controls";
import { useAsyncResource } from "use-async-resource";
import { fetchCustomers } from "../../features/customers/customersSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import AppState from "../../types/AppState";
import { AnyAction } from "redux";
import { fetchExclusions } from "../../features/exclusions/exclusionsSlice";
import { fetchRecipes } from "../../features/recipes/recipesSlice";

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

const LazyEditCustomer = React.lazy(
  async () => import("../../features/customers/EditCustomerPage")
);

const Router: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, void, AnyAction>>();

  const [reader] = useAsyncResource(async () => {
    const customersPromise = dispatch(fetchCustomers());
    const exclusionsPromise = dispatch(fetchExclusions());
    const recipesPromise = dispatch(fetchRecipes());
    return Promise.all([exclusionsPromise, customersPromise, recipesPromise]);
  }, []);

  return (
    <React.Suspense
      fallback={
        <Box alignSelf="center" pad={{ vertical: "large" }}>
          <Spinning size="large" />
        </Box>
      }
    >
      <AuthenticatedRoute
        exact
        dataReader={reader}
        path="/"
        groups={["anonymous", "user", "admin"]}
        component={LazyHome}
      />
      <AuthenticatedRoute
        dataReader={reader}
        path="/customers"
        groups={["user", "admin"]}
        component={LazyCustomers}
      />
      <AuthenticatedRoute
        dataReader={reader}
        path="/recipes"
        groups={["user", "admin"]}
        component={LazyRecipes}
      />
      <AuthenticatedRoute
        dataReader={reader}
        path="/planner"
        groups={["user", "admin"]}
        component={LazyPlanner}
      />
      <AuthenticatedRoute
        dataReader={reader}
        path="/customisations"
        groups={["user", "admin"]}
        component={LazyExclusions}
      />
      <AuthenticatedRoute
        dataReader={reader}
        path="/edit-customer/:id"
        groups={["user", "admin"]}
        component={LazyEditCustomer}
      />
      <AuthenticatedRoute
        dataReader={reader}
        path="/new-customer"
        groups={["user", "admin"]}
        component={LazyNewCustomer}
      />
    </React.Suspense>
  );
};

export default Router;
