import Customer from "../domain/Customer";
import CustomerMealsSelection from "../types/CustomerMealsSelection";
import type { DocumentDefinition } from "./downloadPdf";
import Recipe from "../domain/Recipe";
import { createMealWithVariantString } from "../lib/plan-meals";

const generateNameString = (customer: Customer) =>
  `${customer.surname}, ${customer.firstName}`;

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
      ...new Array(columns)
        .fill("")
        .map((item, index) =>
          index < selection.meals.length
            ? createMealWithVariantString(
                selection.customer,
                selection.meals[index],
                allMeals
              )
            : ""
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
          options
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
