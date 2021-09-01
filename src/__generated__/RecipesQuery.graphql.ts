/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type RecipesQueryVariables = {};
export type RecipesQueryResponse = {
    readonly recipes: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly hotOrCold: string;
        readonly shortName: string;
        readonly description: string | null;
        readonly potentialExclusions: ReadonlyArray<{
            readonly name: string;
            readonly id: string;
            readonly allergen: boolean;
        }>;
    }>;
};
export type RecipesQuery = {
    readonly response: RecipesQueryResponse;
    readonly variables: RecipesQueryVariables;
};



/*
query RecipesQuery {
  recipes {
    id
    name
    hotOrCold
    shortName
    description
    potentialExclusions {
      name
      id
      allergen
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Recipe",
    "kind": "LinkedField",
    "name": "recipes",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hotOrCold",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "shortName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Exclusion",
        "kind": "LinkedField",
        "name": "potentialExclusions",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allergen",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RecipesQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RecipesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "0ec6361a8e2c8ea30e944f089c0a4c0f",
    "id": null,
    "metadata": {},
    "name": "RecipesQuery",
    "operationKind": "query",
    "text": "query RecipesQuery {\n  recipes {\n    id\n    name\n    hotOrCold\n    shortName\n    description\n    potentialExclusions {\n      name\n      id\n      allergen\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2ee656c0df5601c6dedae7814f367db1';
export default node;
