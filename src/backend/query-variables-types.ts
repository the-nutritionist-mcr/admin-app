import Customer from "../domain/Customer";
import Exclusion from "../domain/Exclusion";

export interface ListCustomersQueryVariables {
  input: Record<string, never>;
}

export interface ListRecipesQueryVariables {
  input: Record<string, never>;
}

export interface DeleteCustomerMutationVariables {
  input: {
    id: string;
  };
}

export interface CreateExclusionMutationVariables {
  input: Omit<UpdateExclusionMutationVariables["input"], "id">;
}

export interface UpdateExclusionMutationVariables {
  input: Exclusion;
}

export interface CreateCustomerMutationVariables {
  input: Omit<UpdateCustomerMutationVariables["input"], "id">;
}

export interface UpdateCustomerMutationVariables {
  input: Omit<Customer, "exclusions"> & { exclusionIds: string[] };
}

export interface CustomerExclusion {
  id: string;
  customerId: string;
  exclusionId: string;
}

export type AllQueryVariables =
  | ListCustomersQueryVariables
  | DeleteCustomerMutationVariables
  | CreateCustomerMutationVariables;
