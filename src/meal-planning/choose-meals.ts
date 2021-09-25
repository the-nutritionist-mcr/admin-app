import Customer from "../domain/Customer";
import { CustomerPlan, Item } from "../features/customers/types";
import { extrasLabels, planLabels } from "../lib/config";
import getStatusString from "../lib/getStatusString";
import isActive from "../lib/isActive";
import DeliveryMealsSelection from "../types/DeliveryMealsSelection";
import { CustomerMealsSelection, SelectedItem } from "./types";

const getRecipeFromSelection = (
  index: number,
  deliverySelection: DeliveryMealsSelection
) => {
  return deliverySelection[index % deliverySelection.length];
};

const generateDeliveryListFromItem = <
  T extends typeof extrasLabels[number] | typeof planLabels[number]
>(
  item: Item<T>
) =>
  [...new Array(item.quantity)].map(() => ({
    chosenVariant: item.name,
  }));

const generateDeliveries = (
  plan: CustomerPlan,
  deliverySelections: DeliveryMealsSelection[],
  startPositions: number[]
) => {
  const newStartPositions = [...startPositions];
  return {
    startPositions: newStartPositions,
    deliveries: plan.deliveries.map(
      (delivery, deliveryIndex): SelectedItem[] => {
        const itemList = [
          ...delivery.items
            .flatMap((item) => generateDeliveryListFromItem(item))
            .map((item, index) => ({
              ...item,
              recipe: getRecipeFromSelection(
                index + startPositions[deliveryIndex],
                deliverySelections[deliveryIndex]
              ),
            })),
          ...delivery.extras.flatMap((item) =>
            generateDeliveryListFromItem(item)
          ),
        ];
        newStartPositions[deliveryIndex] += itemList.length;
        return itemList;
      }
    ),
  };
};


const hasPlan = (
  customer: Customer
): customer is Omit<Customer, "newPlan"> &
  Required<Pick<Customer, "newPlan">> => Boolean(customer.newPlan);

export const chooseMeals = (
  deliverySelection: DeliveryMealsSelection[],
  cookDates: Date[],
  customers: Customer[]
): CustomerMealsSelection =>
  customers
    .filter(hasPlan)
    .map((customer) => ({
      customer,
      startPositions: deliverySelection.map(() => 0),
    }))
    .reduce<
      {
        customer: Customer;
        deliveries: SelectedItem[][];
        startPositions?: number[];
      }[]
    >((accum, customer, index) => {
      const deliveries = generateDeliveries(
        customer.customer.newPlan,
        deliverySelection,
        accum[index - 1]?.startPositions ?? customer.startPositions
      );
      return [
        ...accum,
        {
          ...customer,
          ...deliveries,
        },
      ];
    }, [])
    .map(({ customer, deliveries }) => ({
      customer,
      deliveries: deliveries.map((delivery, index) =>
        isActive(customer, cookDates[index])
          ? delivery
          : getStatusString(customer, cookDates[index])
      ),
    }));
