import {
  CustomerPlan,
  Item,
  PlannerConfig,
  Delivery,
  DaysPerWeek,
} from "./types";

const distributeItems = (
  inputPlan: CustomerPlan,
  daysPerWeek: DaysPerWeek,
  targetItem: string,
  section: Exclude<keyof Delivery, "deliveryDay">
): CustomerPlan => {
  const distribution = [...new Array(daysPerWeek === 7 ? 6 : daysPerWeek)]
    .map(() => targetItem)
    .reduce<CustomerPlan>(
      (accum, item, index) => {
        const found = accum.deliveries[index % 2][section].find(
          (foundItem) => foundItem.name === item
        );
        if (found) {
          found.quantity++;
        }
        return accum;
      },
      { ...inputPlan }
    );

  if (daysPerWeek === 7) {
    const found = distribution.deliveries[1][section].find(
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
  inputPlan: CustomerPlan,
  multiple: number,
  targetItem: string
): CustomerPlan => ({
  deliveries: inputPlan.deliveries.map((delivery) => ({
    ...delivery,
    items: multiplyItem(delivery.items, multiple, targetItem),
    extras: multiplyItem(delivery.extras, multiple, targetItem),
  })),
});

const makeDefaultPlan = (plannerConfig: PlannerConfig): CustomerPlan => ({
  deliveries: plannerConfig.defaultDeliveryDays.map((day) => ({
    deliveryDay: day,
    items: plannerConfig.planLabels.map((label) => ({
      name: label,
      quantity: 0,
    })),
    extras: plannerConfig.extrasLabels.map((label) => ({
      name: label,
      quantity: 0,
    })),
  })),
});

export const generateDistribution = (
  daysPerWeek: DaysPerWeek,
  mealsPerDay: number,
  totalPlans: number,
  mealSize: string,
  chosenExtras: string[],
  plannerConfig: PlannerConfig
): CustomerPlan => {
  const defaultPlan = makeDefaultPlan(plannerConfig);
  const distribution = distributeItems(
    defaultPlan,
    daysPerWeek,
    mealSize,
    "items"
  );

  const afterMultiply = multiplyItems(
    distribution,
    mealsPerDay * totalPlans,
    mealSize
  );

  return chosenExtras.reduce<CustomerPlan>(
    (currentPlan, extra) =>
      multiplyItems(
        distributeItems(currentPlan, daysPerWeek, extra, "extras"),
        totalPlans,
        extra
      ),
    afterMultiply
  );
};
