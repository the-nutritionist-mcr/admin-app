import React, { FC } from "react";
import UserContext from "../../lib/UserContext";
import { Route } from "react-router-dom";
import { PreloadedQuery, useQueryLoader } from "react-relay"
import { OperationType } from "relay-runtime";

interface LoadableRouteProps<DT extends OperationType> {
  queryRef: PreloadedQuery<DT>
}

export type LazyImportType<DT extends OperationType> = () => Promise<{ default: FC<LoadableRouteProps<DT>>}>

interface AuthenticatedrouteProps<OT extends OperationType> {
  path: string;
  groups: string[];
  lazyImport: LazyImportType<OT>;
  exact?: boolean;
  dataQuery: Parameters<typeof useQueryLoader>[0]
}

function assertFC<P>(
  _component: React.FC<P>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): asserts _component is React.FC<P> {}

function AuthenticatedRoute<DT extends OperationType>(
  props: AuthenticatedrouteProps<DT>
): React.ReactElement | null {
  const user = React.useContext(UserContext);
  const [queryReference, loadQuery] = useQueryLoader<DT>(props.dataQuery)

  const LazyComponent = React.lazy(props.lazyImport)

  React.useEffect(() => {
    loadQuery({});
  }, [])

  return queryReference && props.groups.some((group) => user?.groups?.includes(group)) ? (
    <Route exact={props.exact} path={props.path}>
      <LazyComponent queryRef={queryReference} />
    </Route>
  ) : null;
}

assertFC(AuthenticatedRoute);

export default AuthenticatedRoute;
