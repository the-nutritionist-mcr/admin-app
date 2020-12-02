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

  return props.groups.some((group) => user?.groups.includes(group)) ? (
    <Route exact={props.exact} path={props.path}>
      {props.children}
    </Route>
  ) : null;
};

export default AuthenticatedRoute;
