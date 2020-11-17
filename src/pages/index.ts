import LoadableRoute from "../types/LoadableRoute";

const pages: LoadableRoute[] = [
  {
    exact: true,
    path: "/",
    route: import("./Home"),
  },
  {
    path: "/customers",
    route: import("./Customers"),
  },
  {
    path: "/recipes",
    route: import("./Recipes"),
  },
  {
    path: "/exclusions",
    route: import("./Exclusions"),
  },
  {
    path: "/planner",
    route: import("./Planner"),
  },
  {
    path: "/test",
    route: import("./Test"),
  },
];

export default pages;
