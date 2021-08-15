import CookPlan from "../types/CookPlan";
import type { DocumentDefinition } from "./downloadPdf";
import { Extras } from "../types/CustomerMealsSelection";
import formatPlanItem from "./formatPlanItem";

const generateCookPlanDocumentDefinition = ({
  plan,
  extras,
}: {
  plan: CookPlan;
  extras: Extras;
}): DocumentDefinition => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(Date.now());

  const total = plan.reduce<number>(
    (finalNumber, planItem) =>
      Object.keys(planItem.plan).reduce<number>(
        (planFinalNumber, key) => planFinalNumber + planItem.plan[key].count,
        0
      ) + finalNumber,
    0
  );

  const body = [
    ...plan.map((planItem) => [
      { text: planItem.recipe.name, fontSize: 15, bold: true },
      {
        ul: Object.keys(planItem.plan)
          .slice()
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          .sort((a, b) => (a > b ? 1 : -1))
          .map((key) =>
            formatPlanItem(
              `${key} x ${planItem.plan[key].count}`,
              planItem.plan[key]
            )
          ),
      },
    ]),
    [
      {
        text: "Extras",
        fontSize: 15,
        bold: true,
      },
      {
        ul: [
          `Breakfasts x ${extras.breakfast}`,
          `Snacks x ${extras.snack}`,
          `Large Snacks x ${extras.largeSnack}`,
        ],
      },
    ],
    [
      { text: "Total cooked", fontSize: 15, bold: true },
      { text: `${total} meals`, fontSize: 15, bold: true },
    ],
  ];

  return {
    content: [
      {
        text: `TNM Cook Plan (printed ${date.toLocaleDateString(
          undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options as any
        )})`,
        style: "header",
      },
      {
        table: {
          headerRows: 0,
          widths: ["*", "*"],
          body,
        },
      },
    ],
    pageOrientation: "portrait",
    defaultStyle: {
      fontSize: 13,
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

export default generateCookPlanDocumentDefinition;
