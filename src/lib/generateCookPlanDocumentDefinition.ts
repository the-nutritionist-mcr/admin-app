import CookPlan from "../types/CookPlan";
import type { DocumentDefinition } from "./downloadPdf";

const generateCookPlanDocumentDefinition = (
  cookPlan: CookPlan
): DocumentDefinition => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(Date.now());

  const body = cookPlan.map((planItem) => [
    { text: planItem.recipe.name, fontSize: 15, bold: true },
    {
      ul: Object.keys(planItem.plan).map(
        (key) => `${key} x ${planItem.plan[key]}`
      ),
    },
  ]);

  return {
    content: [
      {
        text: `TNM Cook Plan (printed ${date.toLocaleDateString(
          undefined,
          options
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
