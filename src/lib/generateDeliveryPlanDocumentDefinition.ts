import Customer from "../domain/Customer";
import { DocumentDefinition } from "./downloadPdf";
import Recipe from "../domain/Recipe";
import {
  createVariant,
  CustomerMealsSelection,
  SelectedItem,
} from "../lib/plan-meals";
import { daysOfWeek, defaultDeliveryDays } from "./config";
import formatPlanItem from "./formatPlanItem";
import { PdfBuilder } from "./pdf-builder";

const COLUMNS = 6;

interface CustomerMealDaySelection {
  customer: Customer;
  delivery: SelectedItem[];
}

interface CookSelections {
  [day: string]: CustomerMealDaySelection[];
}

const makeRowsFromSelections = (
  customerSelections: CustomerMealDaySelection[],
  allMeals: Recipe[]
) =>
  customerSelections.map((customerSelection) => [
    [
      {
        fontSize: 13,
        text: generateNameString(customerSelection.customer),
        bold: true,
      },
    ],
    ...customerSelection.delivery
      .map((item) => createVariant(customerSelection.customer, item, allMeals))
      .map((item) => formatPlanItem(item.mealWithVariantString, item)),
  ]);

const daySelections = (
  cookIndex: number,
  day: string,
  selections: CustomerMealsSelection
) =>
  selections
    .filter(
      (selection) =>
        selection.customer.newPlan?.configuration.deliveryDays[cookIndex] ===
        day
    )
    .map(({ deliveries, ...selection }) => ({
      ...selection,
      delivery: deliveries[cookIndex],
    }));

const generateNameString = (customer: Customer) =>
  `${customer.surname}, ${customer.firstName}`;

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const generateDeliveryPlanDocumentDefinition = (
  selections: CustomerMealsSelection,
  allMeals: Recipe[]
): DocumentDefinition => {
  const customerGroups = defaultDeliveryDays.map((day, cookIndex) =>
    daysOfWeek.reduce<CookSelections>(
      (current, dayOfWeek) =>
        daySelections(cookIndex, dayOfWeek, selections).length === 0
          ? current
          : {
              ...current,
              [dayOfWeek]: daySelections(cookIndex, dayOfWeek, selections),
            },
      {}
    )
  );

  const date = new Date(Date.now());

  const title = `TNM Pack Plan (printed ${date.toLocaleDateString(
    undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any
  )})`;

  const builder = customerGroups.reduce<PdfBuilder>(
    (topBuilder, current, cookIndex) =>
      Object.entries(current).reduce<PdfBuilder>(
        (midBuilder, [day, currentSelections]) =>
          midBuilder
            .header(`Cook ${cookIndex + 1}: ${day}`)
            .table(makeRowsFromSelections(currentSelections, allMeals), COLUMNS)
            .pageBreak(),
        topBuilder
      ),
    new PdfBuilder(title, true)
  );

  return builder.toDocumentDefinition();
};

export default generateDeliveryPlanDocumentDefinition;
