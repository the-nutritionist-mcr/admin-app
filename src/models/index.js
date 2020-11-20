// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const {
  Exclusion,
  CustomerExclusion,
  Customer,
  RecipeExclusion,
  Recipe,
  Plan,
} = initSchema(schema);

export {
  Exclusion,
  CustomerExclusion,
  Customer,
  RecipeExclusion,
  Recipe,
  Plan,
};
