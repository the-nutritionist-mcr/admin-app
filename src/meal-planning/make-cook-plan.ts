import Recipe from "../domain/Recipe";
import { RecipeVariantMap } from "../types/CookPlan";
import { CustomerMealsSelection } from "./types";
import { defaultDeliveryDays } from "../lib/config";
import { createVariant } from "./create-variant";
import { isSelectedMeal } from "./is-selected-meal";

export const makeCookPlan = (
  selections: CustomerMealsSelection,
  allMeals: Recipe[]
): Map<string, RecipeVariantMap>[] => {
  return defaultDeliveryDays.map((day, deliveryIndex) =>
    selections.reduce<Map<string, RecipeVariantMap>>(
      (startMap, customerSelections) => {
        const cook = customerSelections.deliveries[deliveryIndex];
        if (typeof cook === "string") {
          return startMap;
        }
        return cook.reduce((map, item) => {
          const variant = createVariant(
            customerSelections.customer,
            item,
            allMeals
          );
          const key = isSelectedMeal(item)
            ? item.recipe.name
            : item.chosenVariant;
          const previousMap = map.get(key);
          const previousVariant = previousMap?.[variant.string];
          map.set(key, {
            ...previousMap,
            [variant.string]: {
              ...variant,
              ...previousVariant,
              count: (previousVariant?.count ?? 0) + 1
            }
          });
          return map;
        }, startMap);
      },
      new Map()
    )
  );
};
