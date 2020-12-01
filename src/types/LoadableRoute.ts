import React from "react";

export default interface LoadableRoute {
  name: string;
  icon: React.ElementType;
  path?: string;
  exact?: boolean;
  groups: string[];
  resolvedRoute?: React.FC<LoadableRouteProps>;
  route: Promise<{ default: React.FC<LoadableRouteProps> }>;
}

interface LoadableRouteProps {
  name: string;
}
