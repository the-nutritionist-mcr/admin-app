/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export declare class Plan {
  public readonly name: string;
  public readonly mealsPerDay: number;
  public readonly costPerMeal: number;
  public readonly category: string;
  public constructor(init: ModelInit<Plan>);
}

export declare class Exclusion {
  public readonly id: string;
  public readonly name: string;
  public readonly allergen: boolean;
  public readonly customers: CustomerExclusion[];
  public readonly recipes: RecipeExclusion[];
  public constructor(init: ModelInit<Exclusion>);
  public static copyOf(
    source: Exclusion,
    mutator: (draft: MutableModel<Exclusion>) => MutableModel<Exclusion> | void
  ): Exclusion;
}

export declare class CustomerExclusion {
  public readonly id: string;
  public readonly exclusion?: Exclusion;
  public readonly customer?: Customer;
  public constructor(init: ModelInit<CustomerExclusion>);
  public static copyOf(
    source: CustomerExclusion,
    mutator: (
      draft: MutableModel<CustomerExclusion>
    ) => MutableModel<CustomerExclusion> | void
  ): CustomerExclusion;
}

export declare class Customer {
  public readonly id: string;
  public readonly firstName: string;
  public readonly surname: string;
  public readonly salutation: string;
  public readonly address: string;
  public readonly telephone: string;
  public readonly startDate?: string;
  public readonly paymentDateOfMonth?: number;
  public readonly notes?: string;
  public readonly email: string;
  public readonly pauseStart?: string;
  public readonly pauseEnd?: string;
  public readonly daysPerWeek: number;
  public readonly plan: Plan;
  public readonly legacyPrice?: number;
  public readonly snack: string;
  public readonly breakfast: boolean;
  public readonly exclusions: CustomerExclusion[];
  public constructor(init: ModelInit<Customer>);
  public static copyOf(
    source: Customer,
    mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void
  ): Customer;
}

export declare class RecipeExclusion {
  public readonly id: string;
  public readonly recipeId: string;
  public readonly exclusion?: Exclusion;
  public readonly recipe?: Recipe;
  public readonly recipePotentialExclusionsId?: string;
  public constructor(init: ModelInit<RecipeExclusion>);
  public static copyOf(
    source: RecipeExclusion,
    mutator: (
      draft: MutableModel<RecipeExclusion>
    ) => MutableModel<RecipeExclusion> | void
  ): RecipeExclusion;
}

export declare class Recipe {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly potentialExclusions: RecipeExclusion[];
  public constructor(init: ModelInit<Recipe>);
  public static copyOf(
    source: Recipe,
    mutator: (draft: MutableModel<Recipe>) => MutableModel<Recipe> | void
  ): Recipe;
}

/* eslint-enable max-classes-per-file */
/* eslint-enable import/prefer-default-export */
