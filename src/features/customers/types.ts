export interface Item {
  name: string;
  quantity: number;
}

export interface Delivery {
  items: Item[];
  extras: Item[];
}

export interface PlanConfiguration {
  planType: string;
  daysPerWeek: DaysPerWeek;
  mealsPerDay: number;
  totalPlans: number;
  deliveryDays: string[];
  extrasChosen: string[];
}

export interface CustomerPlan {
  deliveries: Delivery[];
  configuration: PlanConfiguration;
}

export interface PlannerConfig {
  planLabels: string[];
  extrasLabels: string[];
  defaultDeliveryDays: string[];
}

export type DaysPerWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
