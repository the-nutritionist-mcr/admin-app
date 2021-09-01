/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type CustomerRowComponent_customer = {
  readonly id: string;
  readonly newPlan: {
    readonly deliveries: ReadonlyArray<{
      readonly items: ReadonlyArray<{
        readonly name: string;
        readonly quantity: number;
      }>;
      readonly extras: ReadonlyArray<{
        readonly name: string;
        readonly quantity: number;
      }>;
    }>;
    readonly configuration: {
      readonly planType: string;
      readonly daysPerWeek: number;
      readonly mealsPerDay: number;
      readonly totalPlans: number;
      readonly deliveryDays: ReadonlyArray<string>;
      readonly extrasChosen: ReadonlyArray<string>;
    } | null;
  } | null;
  readonly snack: string;
  readonly breakfast: boolean;
  readonly pauseStart: string | null;
  readonly pauseEnd: string | null;
  readonly exclusions: ReadonlyArray<{
    readonly name: string;
  }>;
  readonly surname: string;
  readonly firstName: string;
  readonly salutation: string;
  readonly " $refType": "CustomerRowComponent_customer";
};
export type CustomerRowComponent_customer$data = CustomerRowComponent_customer;
export type CustomerRowComponent_customer$key = {
  readonly " $data"?: CustomerRowComponent_customer$data;
  readonly " $fragmentRefs": FragmentRefs<"CustomerRowComponent_customer">;
};

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    v1 = [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "quantity",
        storageKey: null,
      },
    ];
  return {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "CustomerRowComponent_customer",
    selections: [
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "id",
        storageKey: null,
      },
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
                selections: v1 /*: any*/,
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                concreteType: "DeliveryItem",
                kind: "LinkedField",
                name: "extras",
                plural: true,
                selections: v1 /*: any*/,
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
        selections: [v0 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: "ScalarField",
        name: "surname",
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
    type: "Customer",
    abstractKey: null,
  };
})();
(node as any).hash = "bc1ab63fa7a812d2406dfb62b77e1b96";
export default node;
