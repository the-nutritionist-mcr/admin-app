import React, { FC } from "react";
import UserContext from "../../lib/UserContext";
import { Route } from "react-router-dom";
import { PreloadedQuery, useQueryLoader } from "react-relay"
import { OperationType } from "relay-runtime";

interface LoadableRouteProps<DT extends OperationType> {
  queryRef: PreloadedQuery<DT>,
}

export type LazyImportType<DT extends OperationType> = () => Promise<{ default: FC<LoadableRouteProps<DT>>}>

interface AuthenticatedrouteProps<OT extends OperationType> {
  path: string;
  groups: string[];
  lazyImport: LazyImportType<OT>;
  exact?: boolean;
  dataQuery: Parameters<typeof useQueryLoader>[0]
}

() => {
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

  console.log(loadQuery)

  const LazyComponent = React.lazy(props.lazyImport)

  const LoaderComponent: React.FC<LoadableRouteProps<DT>> = React.useCallback((props) => {
    console.log('here1')
    React.useEffect(() => {
      loadQuery({})
      console.log('inUseEffect')
    }, [loadQuery])
    console.log('here')
    return props.queryRef && <LazyComponent queryRef={props.queryRef} />
  }, [loadQuery])

  const LazyLoaderFunction = React.useCallback(() => Promise.resolve({
    default: LoaderComponent
  }), [LoaderComponent])

  const LazyLoader = React.lazy(LazyLoaderFunction)

  return props.groups.some((group) => user?.groups?.includes(group)) ? (
    <Route exact={props.exact} path={props.path}>
      <LazyLoader queryRef={queryReference} />
    </Route>
  ) : null;
}

assertFC(AuthenticatedRoute);

export default AuthenticatedRoute;
