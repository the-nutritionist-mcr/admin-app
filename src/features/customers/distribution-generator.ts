import {
  Item,
  PlannerConfig,
  Delivery,
  DaysPerWeek,
  CustomerPlan,
  PlanConfiguration,
} from "./types";

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

  if (daysPerWeek === 7) {
    const found = distribution[1][section].find(
      (foundItem) => foundItem.name === targetItem
    );
    if (found) {
      found.quantity++;
    }
  }

  return distribution;
};

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

const makeDefaultDeliveryPlan = (plannerConfig: PlannerConfig): Delivery[] =>
  plannerConfig.defaultDeliveryDays.map((day) => ({
    deliveryDay: day,
    items: plannerConfig.planLabels.map((label) => ({
      name: label,
      quantity: 0,
    })),
    extras: plannerConfig.extrasLabels.map((label) => ({
      name: label,
      quantity: 0,
    })),
  }));

const getDefaultConfig = (config: PlannerConfig): PlanConfiguration => ({
  daysPerWeek: 6,
  mealsPerDay: 2,
  totalPlans: 1,
  extrasChosen: [],
  deliveryDays: config.defaultDeliveryDays,
  planType: config.planLabels[0],
});

export const makeNewPlan = (
  defaultSettings: PlannerConfig,
  configuration?: Partial<PlanConfiguration>,
  currentPlan?: CustomerPlan
): CustomerPlan => {
  const defaultConfig = getDefaultConfig(defaultSettings);

  const newConfig: PlanConfiguration = {
    ...defaultConfig,
    ...(currentPlan?.configuration ?? {}),
    ...configuration,
  };
  return {
    configuration: newConfig,
    deliveries: generateDistribution(newConfig, defaultSettings),
  };
};

export const generateDistribution = (
  config: PlanConfiguration,
  defaultSettings: PlannerConfig
): Delivery[] => {
  const defaultPlan = makeDefaultDeliveryPlan(defaultSettings);
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
