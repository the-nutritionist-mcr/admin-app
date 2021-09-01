/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CustomersQueryVariables = {};
export type CustomersQueryResponse = {
  readonly customers: ReadonlyArray<{
    readonly surname: string;
    readonly " $fragmentRefs": FragmentRefs<"CustomerRowComponent_customer">;
  }>;
};
export type CustomersQuery = {
  readonly response: CustomersQueryResponse;
  readonly variables: CustomersQueryVariables;
};

/*
query CustomersQuery {
  customers {
    surname
    ...CustomerRowComponent_customer
    id
  }
}

fragment CustomerRowComponent_customer on Customer {
  id
  newPlan {
    deliveries {
      items {
        name
        quantity
      }
      extras {
        name
        quantity
      }
    }
    configuration {
      planType
      daysPerWeek
      mealsPerDay
      totalPlans
      deliveryDays
      extrasChosen
    }
  }
  snack
  breakfast
  pauseStart
  pauseEnd
  exclusions {
    name
    id
  }
  surname
  firstName
  salutation
}
*/

const node: ConcreteRequest = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "surname",
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v3 = [
      v2 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "quantity",
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "CustomersQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Customer",
          kind: "LinkedField",
          name: "customers",
          plural: true,
          selections: [
            v0 /*: any*/,
            {
              args: null,
              kind: "FragmentSpread",
              name: "CustomerRowComponent_customer",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "CustomersQuery",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Customer",
          kind: "LinkedField",
          name: "customers",
          plural: true,
          selections: [
            v0 /*: any*/,
            v1 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: "CustomerPlan",
              kind: "LinkedField",
              name: "newPlan",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: "Delivery",
                  kind: "LinkedField",
                  name: "deliveries",
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: "DeliveryItem",
                      kind: "LinkedField",
                      name: "items",
                      plural: true,
                      selections: v3 /*: any*/,
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: "DeliveryItem",
                      kind: "LinkedField",
                      name: "extras",
                      plural: true,
                      selections: v3 /*: any*/,
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "PlanConfiguration",
                  kind: "LinkedField",
                  name: "configuration",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "planType",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "daysPerWeek",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "mealsPerDay",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "totalPlans",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "deliveryDays",
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: "ScalarField",
                      name: "extrasChosen",
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "snack",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "breakfast",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "pauseStart",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "pauseEnd",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "Exclusion",
              kind: "LinkedField",
              name: "exclusions",
              plural: true,
              selections: [v2 /*: any*/, v1 /*: any*/],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "firstName",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "salutation",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "202c854edb30b00d93f96fb1bba1717c",
      id: null,
      metadata: {},
      name: "CustomersQuery",
      operationKind: "query",
      text: "query CustomersQuery {\n  customers {\n    surname\n    ...CustomerRowComponent_customer\n    id\n  }\n}\n\nfragment CustomerRowComponent_customer on Customer {\n  id\n  newPlan {\n    deliveries {\n      items {\n        name\n        quantity\n      }\n      extras {\n        name\n        quantity\n      }\n    }\n    configuration {\n      planType\n      daysPerWeek\n      mealsPerDay\n      totalPlans\n      deliveryDays\n      extrasChosen\n    }\n  }\n  snack\n  breakfast\n  pauseStart\n  pauseEnd\n  exclusions {\n    name\n    id\n  }\n  surname\n  firstName\n  salutation\n}\n",
    },
  };
})();
(node as any).hash = "207c3bb13c98894776dd5609e492cb65";
export default node;
