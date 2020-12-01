import { Alert, Cafeteria, Home, Plan, User } from "grommet-icons";
import LoadableRoute from "./types/LoadableRoute";

const pages: LoadableRoute[] = [
  {
    exact: true,
    icon: Home,
    name: "Home",
    path: "/",
    route: import("./features/home/Home"),
    groups: ["anonymous", "user", "admin"],
  },
  {
    name: "Customers",
    route: import("./features/customers/Customers"),
    icon: User,
    groups: ["user", "admin"],
  },
  {
    name: "Recipes",
    icon: Cafeteria,
    route: import("./features/recipes/Recipes"),
    groups: ["user", "admin"],
  },
  {
    icon: Alert,
    name: "Exclusions",
    route: import("./features/exclusions/Exclusions"),
    groups: ["user", "admin"],
  },
  {
    icon: Plan,
    name: "Planner",
    route: import("./features/planner/Planner"),
    groups: ["user", "admin"],
  },
];

export const getRoutePath = (route: LoadableRoute): string =>
  route.path ?? `/${route.name.toLowerCase()}`;

export const getPages = (currentGroups: string[]): LoadableRoute[] =>
  pages.filter((page) =>
    page.groups.some((group) => currentGroups.includes(group))
  );
