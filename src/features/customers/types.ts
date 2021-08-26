export interface Item {
  readonly name: string;
  readonly quantity: number;
}

export interface Delivery {
  readonly items: ReadonlyArray<Item>;
  readonly extras: ReadonlyArray<Item>;
}

export interface PlanConfiguration {
  readonly planType: string;
  readonly daysPerWeek: number;
  readonly mealsPerDay: number;
  readonly totalPlans: number;
  readonly deliveryDays: ReadonlyArray<string>;
  readonly extrasChosen: ReadonlyArray<string>;
}

export interface CustomerPlan {
  readonly deliveries: ReadonlyArray<Delivery>;
  readonly configuration: PlanConfiguration;
}

export interface PlannerConfig {
  planLabels: ReadonlyArray<string>;
  extrasLabels: ReadonlyArray<string>;
  defaultDeliveryDays: ReadonlyArray<string>;
}
