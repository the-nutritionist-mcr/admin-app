import LoadableRoute from "./types/LoadableRoute";

const pages: LoadableRoute[] = [
  {
    exact: true,
    path: "/",
    route: import("./features/home/Home"),
  },
  {
    path: "/customers",
    route: import("./features/customers/Customers"),
  },
  {
    path: "/recipes",
    route: import("./features/recipes/Recipes"),
  },
  {
    path: "/exclusions",
    route: import("./features/exclusions/Exclusions"),
  },
  {
    path: "/planner",
    route: import("./features/planner/Planner"),
  },
];

export default pages;
