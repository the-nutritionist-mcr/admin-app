import CustomerMealsSelection, {
  Extras,
} from "../types/CustomerMealsSelection";
import Customer from "../domain/Customer";
import type { DocumentDefinition } from "./downloadPdf";
import Recipe from "../domain/Recipe";
import { createVariant } from "../lib/plan-meals";
import formatPlanItem from "./formatPlanItem";

const generateNameString = (customer: Customer) =>
  `${customer.surname}, ${customer.firstName}`;

const generateExtrasCell = (extras: Extras) => {
  const extrasList = [];

  if (extras.breakfast) {
    extrasList.push(`Breakfast x ${extras.breakfast}`);
  }

  if (extras.snack) {
    extrasList.push(`Standard snack x ${extras.snack}`);
  }

  if (extras.largeSnack) {
    extrasList.push(`Large snack x ${extras.largeSnack}`);
  }

  if (extrasList.length === 0) {
    return "No extras";
  }

  return { ul: extrasList };
};

const generateDeliveryPlanDocumentDefinition = (
  selections: CustomerMealsSelection,
  allMeals: Recipe[]
): DocumentDefinition => {
  const columns = selections.reduce<number>(
    (numColumns, customer) =>
      customer.meals.length > numColumns ? customer.meals.length : numColumns,
    0
  );

  const body = selections
    .slice()
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    .sort((a, b) => (a.customer.surname > b.customer.surname ? 1 : -1))
    .map((selection) => [
      [
        {
          fontSize: 13,
          text: generateNameString(selection.customer),
          bold: true,
        },
        ...selection.customer.address.split(","),
      ],
      generateExtrasCell(selection.extras),
      ...new Array(columns)
        .fill("")
        .map((item, index) =>
          index < selection.meals.length
            ? createVariant(
                selection.customer,
                selection.meals[index],
                allMeals
              )
            : null
        )
        .map((item) =>
          item ? formatPlanItem(item.mealWithVariantString, item) : ""
        ),
    ]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(Date.now());

  return {
    content: [
      {
        text: `TNM Delivery Plan (printed ${date.toLocaleDateString(
          undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options as any
        )})`,
        style: "header",
      },
      {
        table: {
          headerRows: 0,
          dontBreakRows: true,
          body,
        },
      },
    ],
    pageOrientation: "landscape",
    defaultStyle: {
      fontSize: 10,
    },
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        lineHeight: 1.5,
      },
    },
  };
};

export default generateDeliveryPlanDocumentDefinition;
