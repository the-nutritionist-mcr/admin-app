import React from "react";
import { Route } from "react-router-dom";
import UserContext from "../../lib/UserContext";

interface AuthenticatedrouteProps {
  path: string;
  groups: string[];
  exact?: boolean;
}

const AuthenticatedRoute: React.FC<AuthenticatedrouteProps> = (props) => {
  const user = React.useContext(UserContext);
  const userGroups = user?.signInUserSession?.accessToken?.payload[
    "cognito:groups"
  ] ?? ["anonymous"];

  return props.groups.some((group) => userGroups.includes(group)) ? (
    <Route exact={props.exact} path={props.path}>
      {props.children}
    </Route>
  ) : null;
};

export default AuthenticatedRoute;
