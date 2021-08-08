const DAYS_IN_WEEK = 7;

import {
  Item,
  PlannerConfig,
  Delivery,
  DaysPerWeek,
  CustomerPlan,
  PlanConfiguration,
} from "./types";
import deepEqual from "deep-equal";

/*
 * Distribute a target item across an arbitrary number of deliveries
 * depending on the days of the week.
 *
 * Where there is an odd number of deliveries, the extra item
 * will be added to the first delivery, except in the case of
 * seven days a week, where it gets added to the second delivery
 * (for the weekend)
 */
const distributeItems = (
  inputPlan: Delivery[],
  daysPerWeek: DaysPerWeek,
  targetItem: string,
  section: Exclude<keyof Delivery, "deliveryDay">
): Delivery[] => {
  const distribution = [...new Array(daysPerWeek === 7 ? 6 : daysPerWeek)]
    .map(() => targetItem)
    .reduce<Delivery[]>((deliveries, item, index) => {
      const found = deliveries[index % 2][section].find(
        (foundItem) => foundItem.name === item
      );
      if (found) {
        found.quantity++;
      }
      return deliveries;
    }, inputPlan);

  if (daysPerWeek === DAYS_IN_WEEK) {
    const found = distribution[1][section].find(
      (foundItem) => foundItem.name === targetItem
    );
    if (found) {
      found.quantity++;
    }
  }

  return distribution;
};

/**
 * Multiply the quantities of a target item within a list of items
 * based on a supplied multiple
 */
const multiplyItem = (
  items: Item[],
  multiple: number,
  targetItem: string
): Item[] =>
  items.map((item) =>
    item.name === targetItem
      ? { ...item, quantity: item.quantity * multiple }
      : item
  );

/**
 * Multiply the quantities of a target item within a list of deliveries
 * based on a supplied multiple
 */
const multiplyItems = (
  inputPlan: Delivery[],
  multiple: number,
  targetItem: string
): Delivery[] =>
  inputPlan.map((delivery) => ({
    ...delivery,
    items: multiplyItem(delivery.items, multiple, targetItem),
    extras: multiplyItem(delivery.extras, multiple, targetItem),
  }));

/**
 * Generate the default delivery days based on global configuration
 * before any quantities are added
 */
const makeDefaultDeliveryPlan = (
  plannerConfig: PlannerConfig,
  plan: PlanConfiguration
): Delivery[] =>
  plan.deliveryDays.map(() => ({
    items: plannerConfig.planLabels.map((label) => ({
      name: label,
      quantity: 0,
    })),
    extras: plannerConfig.extrasLabels.map((label) => ({
      name: label,
      quantity: 0,
    })),
  }));

/**
 * Generate a default customer plan configuration
 */
const getDefaultConfig = (config: PlannerConfig): PlanConfiguration => ({
  daysPerWeek: 6,
  mealsPerDay: 2,
  totalPlans: 1,
  extrasChosen: [],
  deliveryDays: config.defaultDeliveryDays,
  planType: config.planLabels[0],
});

/**
 * Generate a new Delivery plan
 */
export const makeNewPlan = (
  defaultSettings: PlannerConfig,
  configuration?: Partial<PlanConfiguration>,
  currentPlan?: CustomerPlan,
  customDeliveryplan?: Delivery[]
): CustomerPlan => {
  const defaultConfig = getDefaultConfig(defaultSettings);

  const newConfig: PlanConfiguration = {
    ...defaultConfig,
    ...(currentPlan?.configuration ?? {}),
    ...configuration,
  };
  return {
    configuration: newConfig,
    deliveries:
      customDeliveryplan ?? generateDistribution(newConfig, defaultSettings),
  };
};

/**
 * Check a given customer plan to see whether they are on
 * a custom delivery plan or not
 */
export const isCustomDeliveryPlan = (
  plan: CustomerPlan,
  defaultSettings: PlannerConfig
): boolean =>
  !deepEqual(
    plan.deliveries,
    generateDistribution(plan.configuration, defaultSettings)
  );

/**
 * Generate the meal delivery distribution based on the plan
 * configuration
 */
export const generateDistribution = (
  config: PlanConfiguration,
  defaultSettings: PlannerConfig
): Delivery[] => {
  const defaultPlan = makeDefaultDeliveryPlan(defaultSettings, config);
  const distribution = distributeItems(
    defaultPlan,
    config.daysPerWeek,
    config.planType,
    "items"
  );

  const afterMultiply = multiplyItems(
    distribution,
    config.mealsPerDay * config.totalPlans,
    config.planType
  );

  return config.extrasChosen.reduce<Delivery[]>(
    (currentPlan, extra) =>
      multiplyItems(
        distributeItems(currentPlan, config.daysPerWeek, extra, "extras"),
        config.totalPlans,
        extra
      ),
    afterMultiply
  );
};
