import React from "react";

export default interface LoadableRoute {
  path: string;
  exact?: boolean;
  resolvedRoute?: React.FC;
  route: Promise<{ default: React.FC }>;
}
