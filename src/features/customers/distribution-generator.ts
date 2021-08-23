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
import { curry, pipe } from "ramda";
import { extrasLabels, planLabels } from "../../lib/config";

/*
 * Distribute a target item across an arbitrary number of deliveries
 * depending on the days of the week.
 *
 * Where there is an odd number of deliveries, the extra item
 * will be added to the first delivery, except in the case of
 * seven days a week, where it gets added to the second delivery
 * (for the weekend)
 */
const distributeItems = curry(
  (
    daysPerWeek: DaysPerWeek,
    targetItem: string,
    section: Exclude<keyof Delivery, "deliveryDay">,
    inputPlan: Delivery[]
  ): Delivery[] =>
    [...new Array(daysPerWeek === DAYS_IN_WEEK ? daysPerWeek - 1 : daysPerWeek)]
      .map(() => targetItem)
      .reduce<Delivery[]>(
        (deliveries, item, index) =>
          incrementFoundInDeliveries(deliveries, index % 2, section, item),
        inputPlan
      )
      .map((delivery, index) =>
        daysPerWeek === DAYS_IN_WEEK && index === 1
          ? incrementTarget(delivery, section, targetItem)
          : delivery
      )
);

const incrementFoundInDeliveries = curry(
  (
    deliveries: Delivery[],
    index: number,
    section: Exclude<keyof Delivery, "deliveryDay">,
    target: string
  ) =>
    deliveries.map((delivery, deliveryIndex) =>
      deliveryIndex !== index
        ? delivery
        : incrementTarget(delivery, section, target)
    )
);

const incrementTarget = (
  delivery: Delivery,
  section: Exclude<keyof Delivery, "deliveryDay">,
  target: string
) => ({
  ...delivery,
  [section]: delivery[section].map((item) =>
    item.name === target ? { ...item, quantity: item.quantity + 1 } : item
  ),
});

const distributeAndMultiply = curry(
  (
    daysPerWeek: DaysPerWeek,
    target: string,
    section: Exclude<keyof Delivery, "deliveryDay">,
    multiple: number,
    inputPlan: Delivery[]
  ) =>
    pipe<Delivery[], Delivery[], Delivery[]>(
      distributeItems(daysPerWeek, target, section),
      multiplyItems(target, multiple)
    )(inputPlan)
);

/**
 * Multiply the quantities of a target item within a list of items
 * based on a supplied multiple
 */
const multiplyItem = curry(
  <T extends typeof extrasLabels[number] | typeof planLabels[number]>(
    items: Item<T>[],
    multiple: number,
    targetItem: string
  ): Item<T>[] =>
    items.map((item) =>
      item.name === targetItem
        ? { ...item, quantity: item.quantity * multiple }
        : item
    )
);

/**
 * Multiply the quantities of a target item within a list of deliveries
 * based on a supplied multiple
 */
const multiplyItems = curry(
  (targetItem: string, multiple: number, inputPlan: Delivery[]): Delivery[] =>
    inputPlan.map((delivery) => ({
      ...delivery,
      items: multiplyItem(delivery.items, multiple, targetItem),
      extras: multiplyItem(delivery.extras, multiple, targetItem),
    }))
);

/**
 * Generate the default delivery days based on global configuration
 * before any quantities are added
 */
const makeDefaultDeliveryPlan = curry(
  (plannerConfig: PlannerConfig, plan: PlanConfiguration): Delivery[] =>
    plan.deliveryDays.map(() => ({
      items: plannerConfig.planLabels.map((label) => ({
        name: label,
        quantity: 0,
      })),
      extras: plannerConfig.extrasLabels.map((label) => ({
        name: label,
        quantity: 0,
      })),
    }))
);

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
  const newConfig: PlanConfiguration = {
    ...getDefaultConfig(defaultSettings),
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
): Delivery[] =>
  pipe(
    () => makeDefaultDeliveryPlan(defaultSettings, config),

    distributeAndMultiply(
      config.daysPerWeek,
      config.planType,
      "items",
      config.mealsPerDay * config.totalPlans
    ),

    config.extrasChosen.reduce(
      (func, extra) =>
        pipe(
          func,
          distributeAndMultiply(
            config.daysPerWeek,
            extra,
            "extras",
            config.totalPlans
          )
        ),
      (d: Delivery[]) => d
    )
  )();
