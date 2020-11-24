import * as tAPI from "../API";
import { API, GraphQLResult } from "@aws-amplify/api";
import Customer, { Snack } from "../domain/Customer";
import {
  createCustomerExclusion as createCustomerExclusionQuery,
  createCustomer as createCustomerQuery,
} from "../graphql/mutations";
import dispatcher, { DispatchPayload } from "../appDispatcher";
import ActionType from "../types/ActionType";
import { PlanCategory } from "../lib/config";
import { graphqlOperation } from "aws-amplify";
import { listCustomers as listCustomersQuery } from "../graphql/queries";

type ExcludesNull = <T>(x: T | null) => x is T;

type RawCustomer = Omit<
  Exclude<tAPI.GetCustomerQuery["getCustomer"], null>,
  "__typename" | "exclusions"
> & {
  exclusions: {
    items:
      | ({
          exclusionId: string;
          exclusion?: { id: string; name: string; allergen: boolean } | null;
        } | null)[]
      | null;
  } | null;
};

const mapCustomer = (item: RawCustomer): Customer => ({
  ...item,
  startDate: item.startDate ?? undefined,
  pauseStart: item.pauseStart ?? undefined,
  pauseEnd: item.pauseEnd ?? undefined,
  notes: item.notes ?? undefined,
  legacyPrice: item.legacyPrice ?? undefined,
  snack: item.snack as Snack,
  exclusions:
    item.exclusions?.items
      ?.filter((Boolean as unknown) as ExcludesNull)
      .map((exclusion) => ({
        id: exclusion.exclusion?.id ?? "",
        name: exclusion.exclusion?.name ?? "",
        allergen: exclusion.exclusion?.allergen ?? false,
      })) ?? [],
  plan: {
    ...item.plan,
    category: item.plan.category as PlanCategory,
  },
});

export const getCustomers = async (): Promise<void> => {
  const queryVariables: tAPI.ListCustomersQueryVariables = {};
  const result: GraphQLResult<tAPI.ListCustomersQuery> = (await API.graphql(
    graphqlOperation(listCustomersQuery, queryVariables)
  )) as GraphQLResult<tAPI.ListCustomersQuery>;

  if (result.data?.listCustomers) {
    const items = result.data.listCustomers.items;

    const customers: Customer[] = (items ?? [])
      .filter((Boolean as unknown) as ExcludesNull)
      .map(mapCustomer);

    const payload: DispatchPayload = {
      actionType: ActionType.GetCustomers,
      data: customers,
    };
    dispatcher.dispatch(payload);
  }
};

const createCustomerExclusion = async (
  customerId: string,
  exclusionId: string
): Promise<void> => {
  const queryVariables: tAPI.CreateCustomerExclusionMutationVariables = {
    input: {
      customerId,
      exclusionId,
    },
  };

  await API.graphql(
    graphqlOperation(createCustomerExclusionQuery, queryVariables)
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export const createNewCustomer = async (customer: Customer): Promise<void> => {
  const {
    exclusions,
    paymentDayOfMonth,
    ...customerWithoutExclusions
  } = customer;
  const queryVariables: tAPI.CreateCustomerMutationVariables = {
    input: {
      ...customerWithoutExclusions,
      paymentDateOfMonth: paymentDayOfMonth,
    },
  };

  const response = (await API.graphql(
    graphqlOperation(createCustomerQuery, queryVariables)
  )) as GraphQLResult<tAPI.CreateCustomerMutation>;

  const customerId = response.data?.createCustomer?.id;
  if (customerId) {
    await Promise.all(
      customer.exclusions.map(async (exclusion) =>
        createCustomerExclusion(customerId, exclusion.id)
      )
    );
  }
};

export const updateCustomer = (
  oldCustomer: Customer,
  customer: Customer
): void => {
  // Const customers = getFromLocalStorage();
  // const index = customers.findIndex(
  //   (customerAtPosition) => customerAtPosition.id === oldCustomer.id
  // );
  // customers[index] = customer;
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.UpdateCustomer,
  //   data: customers,
  // };
  // dispatcher.dispatch(payload);
};

export const deleteCustomer = (customer: Customer): void => {
  // // eslint-disable-next-line fp/no-let
  // let customers = getFromLocalStorage();
  // customers = customers.filter(
  //   (searchedCustomer) => searchedCustomer.id !== customer.id
  // );
  // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(customers));
  // const payload: DispatchPayload = {
  //   actionType: ActionType.DeleteCustomer,
  //   data: customers,
  // };
  // dispatcher.dispatch(payload);
};
