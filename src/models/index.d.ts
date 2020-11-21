import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export declare class Plan {
  readonly name: string;
  readonly mealsPerDay: number;
  readonly costPerMeal: number;
  readonly category: string;
  constructor(init: ModelInit<Plan>);
}

export declare class Exclusion {
  readonly id: string;
  readonly name: string;
  readonly allergen: boolean;
  readonly customers: CustomerExclusion[];
  readonly recipes: RecipeExclusion[];
  constructor(init: ModelInit<Exclusion>);
  static copyOf(
    source: Exclusion,
    mutator: (draft: MutableModel<Exclusion>) => MutableModel<Exclusion> | void
  ): Exclusion;
}

export declare class CustomerExclusion {
  readonly id: string;
  readonly exclusion?: Exclusion;
  readonly customer?: Customer;
  constructor(init: ModelInit<CustomerExclusion>);
  static copyOf(
    source: CustomerExclusion,
    mutator: (
      draft: MutableModel<CustomerExclusion>
    ) => MutableModel<CustomerExclusion> | void
  ): CustomerExclusion;
}

export declare class Customer {
  readonly id: string;
  readonly firstName: string;
  readonly surname: string;
  readonly salutation: string;
  readonly address: string;
  readonly telephone: string;
  readonly startDate?: string;
  readonly paymentDateOfMonth?: number;
  readonly notes?: string;
  readonly email: string;
  readonly pauseStart?: string;
  readonly pauseEnd?: string;
  readonly daysPerWeek: number;
  readonly plan: Plan;
  readonly legacyPrice?: number;
  readonly snack: string;
  readonly breakfast: boolean;
  readonly exclusions: CustomerExclusion[];
  constructor(init: ModelInit<Customer>);
  static copyOf(
    source: Customer,
    mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void
  ): Customer;
}

export declare class RecipeExclusion {
  readonly id: string;
  readonly recipeId: string;
  readonly exclusion?: Exclusion;
  readonly recipe?: Recipe;
  readonly recipePotentialExclusionsId?: string;
  constructor(init: ModelInit<RecipeExclusion>);
  static copyOf(
    source: RecipeExclusion,
    mutator: (
      draft: MutableModel<RecipeExclusion>
    ) => MutableModel<RecipeExclusion> | void
  ): RecipeExclusion;
}

export declare class Recipe {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly potentialExclusions: RecipeExclusion[];
  constructor(init: ModelInit<Recipe>);
  static copyOf(
    source: Recipe,
    mutator: (draft: MutableModel<Recipe>) => MutableModel<Recipe> | void
  ): Recipe;
}
