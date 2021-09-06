import { AppSyncResolverHandler } from "aws-lambda";
import Customer from "../../domain/Customer";
import Exclusion from "../../domain/Exclusion";
import Recipe from "../../domain/Recipe";
import { getAllByIdsMultiTable } from "../database";
import { hydrateCustomerData } from "../hydrateCustomerData";
import { UpdateCustomerMutationVariables } from "../query-variables-types";

type NodeInput = {
  input: {
    id: string
  }
}

const getRequiredEnvVar = (name: string): string => {
  const value = process.env[name];
  if (value) {
    return value;
  }
  throw new Error(`process.env.${name} not set`);
};

type NodeTypes = Customer | Recipe | Exclusion

const customersTable = getRequiredEnvVar("CUSTOMERS_TABLE");

const NODE_TABLES = [
  getRequiredEnvVar("EXCLUSIONS_TABLE"),
  getRequiredEnvVar("RECIPES_TABLE")
]

export const handler: AppSyncResolverHandler<NodeInput, NodeTypes | undefined> = async (event) => {
  const items = await getAllByIdsMultiTable<NodeTypes>(NODE_TABLES, [event.arguments.input.id])

  if(items.items.length === 0) {
    return undefined
  }

  if(items.sources.includes(customersTable)) {
    return await hydrateCustomerData(items.items as unknown as UpdateCustomerMutationVariables["input"][]))[0]
  }

  return items.items[0]
}
