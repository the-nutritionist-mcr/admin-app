import { AppSyncResolverHandler } from "aws-lambda"
import { listCustomers } from "../customers"
import { ListCustomersQueryVariables } from "../query-variables-types";

type ExtractPromiseType<P> = P extends Promise<infer T> ? T : never;

type ListCustomersResult = ExtractPromiseType<ReturnType<typeof listCustomers>>

export const handler: AppSyncResolverHandler<ListCustomersQueryVariables, ListCustomersResult> = async () => await listCustomers()
