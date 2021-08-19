import React from "react";
import UserContext from "../../lib/UserContext";
import { RouteComponentProps, Route } from "react-router-dom"

interface AuthenticatedrouteProps<T> {
  path: string;
  groups: string[];
  exact?: boolean;
  component?: React.ComponentType<RouteComponentProps<T>>
}

function assertFC<P>(
  _component: React.FC<P>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): asserts _component is React.FC<P> {}

function AuthenticatedRoute<T>(props: AuthenticatedrouteProps<T>): React.ReactElement | null {
  const user = React.useContext(UserContext);
  return props.groups.some((group) => user?.groups?.includes(group)) ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : null;

}

assertFC(AuthenticatedRoute)

export default AuthenticatedRoute;
