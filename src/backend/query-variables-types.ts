import Plan from "../domain/Plan";
import { Snack } from "../domain/Customer";

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

export interface CreateCustomerMutationVariables {
  input: {
    firstName: string;
    surname: string;
    createdAt?: string;
    updatedAt?: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate?: string;
    paymentDayOfMonth?: number;
    notes?: string;
    email: string;
    pauseStart?: string;
    pauseEnd?: string;
    daysPerWeek: number;
    plan: Plan;
    legacyPrice?: number;
    snack: Snack;
    breakfast: boolean;
    exclusionIds: string[];
  };
}

export type AllQueryVariables =
  | ListCustomersQueryVariables
  | DeleteCustomerMutationVariables
  | CreateCustomerMutationVariables;
