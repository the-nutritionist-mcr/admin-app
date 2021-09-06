import { AppSyncResolverHandler } from "aws-lambda";
import Customer from "../../domain/Customer";
import Exclusion from "../../domain/Exclusion";
import Recipe from "../../domain/Recipe";
import { getAllByIdsMultiTable } from "../database";

type CustomerInput = {
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

const NODE_TABLES = [
  getRequiredEnvVar("CUSTOMERS_TABLE"),
  getRequiredEnvVar("EXCLUSIONS_TABLE"),
  getRequiredEnvVar("RECIPES_TABLE")
]

export const handler: AppSyncResolverHandler<CustomerInput, NodeTypes | undefined> = async (event) => {
  const items = await getAllByIdsMultiTable<NodeTypes>(NODE_TABLES, [event.arguments.input.id])

  return items.length !== 0 ? items[0] : undefined;
}
