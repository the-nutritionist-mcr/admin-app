import CustomerMealsSelection from "../types/CustomerMealsSelection";

type ValueType = string | number | boolean | undefined;

const createLabelData = (
  customerSelection: CustomerMealsSelection
): Record<string, ValueType>[] => {
  const data = customerSelection.map((selection) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      id,
      exclusions,
      createdAt,
      updatedAt,
      ...customer
    } = selection.customer;

    const meals = selection.meals.map(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      ({ id, potentialExclusions, createdAt, updatedAt, ...meals }) => meals
    );
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const customerWithPlanFlattened = {
      ...customer,
      plan: selection.customer.plan.name,
    };

    return meals.map((meal) => ({
      ...customerWithPlanFlattened,
      ...meal,
    }));
  });
  return data.flat();
};

export default createLabelData;
