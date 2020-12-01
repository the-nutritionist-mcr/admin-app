import { Alert, Cafeteria, Home, Plan, User } from "grommet-icons";
import LoadableRoute from "./types/LoadableRoute";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const pages: LoadableRoute[] = [
  {
    sortKey: 1,
    exact: true,
    icon: Home,
    name: "Home",
    path: "/",
    loadRoute: async () => import("./features/home/Home"),
    groups: ["anonymous", "user", "admin"],
  },
  {
    sortKey: 2,
    name: "Customers",
    loadRoute: async () => import("./features/customers/Customers"),
    icon: User,
    groups: ["user", "admin"],
  },
  {
    sortKey: 3,
    name: "Recipes",
    icon: Cafeteria,
    loadRoute: async () => import("./features/recipes/Recipes"),
    groups: ["user", "admin"],
  },
  {
    sortKey: 4,
    icon: Alert,
    name: "Exclusions",
    loadRoute: async () => import("./features/exclusions/Exclusions"),
    groups: ["user", "admin"],
  },
  {
    sortKey: 5,
    icon: Plan,
    name: "Planner",
    loadRoute: async () => import("./features/planner/Planner"),
    groups: ["user", "admin"],
  },
];
/* eslint-enable @typescript-eslint/explicit-function-return-type */

export const getRoutePath = (route: LoadableRoute): string =>
  route.path ?? `/${route.name.toLowerCase()}`;

interface PageLoadingSession {
  currentRoute?: LoadableRoute;
  otherRoutes: LoadableRoute[];
}

export const loadPages = (
  currentPath: string,
  groups: string[]
): PageLoadingSession => {
  const allowedPages = pages.filter((page) =>
    page.groups.some((group) => groups.includes(group))
  );

  const preloadPages: PageLoadingSession = {
    currentRoute: allowedPages.find(
      (page) => getRoutePath(page) === currentPath
    ),
    otherRoutes: allowedPages.filter(
      (page) => getRoutePath(page) !== currentPath
    ),
  };

  if (preloadPages.currentRoute) {
    preloadPages.currentRoute.loadingRoute = preloadPages.currentRoute.loadRoute();
  }

  preloadPages.otherRoutes = preloadPages.otherRoutes.map((route) => ({
    ...route,
    loadingRoute: route.loadRoute(),
  }));

  return preloadPages;
};
