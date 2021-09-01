import API, { graphqlOperation } from "@aws-amplify/api";
import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

const fetchRelay: FetchFunction = async (params, variables) => {
  return API.graphql(graphqlOperation(params.text), variables);
};

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
