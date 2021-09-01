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

function assertFC<P>(
  _component: React.FC<P>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
): asserts _component is React.FC<P> {}

function AuthenticatedRoute<DT extends OperationType>(
  props: AuthenticatedrouteProps<DT>
): React.ReactElement | null {
  const user = React.useContext(UserContext);

  const LazyLoaderFunction = React.useCallback(() => {
    const LazyComponent = React.lazy(props.lazyImport)
    const LoaderComponent: React.FC = () => {
      const [queryReference, loadQuery] = useQueryLoader<DT>(props.dataQuery)
      React.useEffect(() => {
        !queryReference && loadQuery({})
      }, [loadQuery, queryReference])
      return (queryReference && <LazyComponent queryRef={queryReference} />) ?? null
    }
    return Promise.resolve({
      default: LoaderComponent
    })
  }, [props.lazyImport, props.dataQuery])

  const LazyLoader = React.lazy(LazyLoaderFunction)

  return props.groups.some((group) => user?.groups?.includes(group)) ? (
    <Route exact={props.exact} path={props.path}>
      <LazyLoader />
    </Route>
  ) : null;
}

assertFC(AuthenticatedRoute);

export default AuthenticatedRoute;
