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
];

export default pages;
