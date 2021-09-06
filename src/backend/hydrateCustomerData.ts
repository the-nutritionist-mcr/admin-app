import Exclusion from "../domain/Exclusion";
import * as database from "./database";
import { getRequiredEnvVar } from "./getRequiredEnvVar";
import { CustomerExclusion, UpdateCustomerMutationVariables } from "./query-variables-types";

export const hydrateCustomerData = async (customerData: UpdateCustomerMutationVariables["input"][]) => {
  const exclusionsTable = getRequiredEnvVar("EXCLUSIONS_TABLE");
  const customerExclusionsTable = getRequiredEnvVar(
    "CUSTOMER_EXCLUSIONS_TABLE"
  );

  const customerExclusionIds = new Set(
    customerData.flatMap((customer) => customer.exclusionIds).filter(Boolean)
  );

  const customerExclusions = await database.getAllByIds<CustomerExclusion>(
    customerExclusionsTable,
    Array.from(customerExclusionIds)
  );

  const exclusions = await database.getAllByIds<Exclusion>(
    exclusionsTable,
    customerExclusions.map((customerExclusion) => customerExclusion.exclusionId)
  );

  const finalCustomers = customerData
    .map((customer) => ({
      ...customer,
      exclusions: customer.exclusionIds
        .map((id) =>
          customerExclusions.find(
            (customerExclusion) => customerExclusion.id === id
          )
        )
        .map((customerExclusion) =>
          exclusions.find(
            (exclusion) => exclusion.id === customerExclusion?.exclusionId
          )
        )
        .filter(Boolean),
    }))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ exclusionIds, ...customer }) => customer);

  return finalCustomers
}
