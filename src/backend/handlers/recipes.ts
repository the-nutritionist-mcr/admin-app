import { AppSyncResolverHandler } from "aws-lambda";
import { listRecipes } from "../recipes";
import { ListRecipesQueryVariables } from "../query-variables-types";

type ExtractPromiseType<P> = P extends Promise<infer T> ? T : never;

type ListrecipesResult = ExtractPromiseType<ReturnType<typeof listRecipes>>;

export const handler: AppSyncResolverHandler<
  ListRecipesQueryVariables,
  ListrecipesResult
> = async () => await listRecipes();
