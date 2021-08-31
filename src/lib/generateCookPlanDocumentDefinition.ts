import { RecipeVariantMap } from "../types/CookPlan";
import formatPlanItem from "./formatPlanItem";
import { PdfBuilder } from "./pdf-builder";

const generateCookPlanDocumentDefinition = (
  cookPlan: Map<string, RecipeVariantMap>[]
) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(Date.now());

  const title = `TNM Cook Plan (printed ${date.toLocaleDateString(
    undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any
  )})`;

  const formatRecipeVariantMap = (map: RecipeVariantMap) => ({
    ul: Object.keys(map)
      .slice()
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      .sort((a, b) => (a > b ? 1 : -1))
      .map((key) => formatPlanItem(`${key} x ${map[key].count}`, map[key])),
  });

  const convertPlanToRows = (individualCookPlan: Map<string, RecipeVariantMap>) => {
    const all = Array.from(individualCookPlan.entries());
    return all.map(([recipeName, value]) => [
      { text: recipeName, style: 'rowHeader' },
      formatRecipeVariantMap(value),
    ]);
  };

  const returnVal = cookPlan.reduce<PdfBuilder>(
    (builder, plan, index) =>
      builder
        .header(`Cook ${index + 1}`)
        .table(convertPlanToRows(plan), 1, [200, "*"])
        .pageBreak(),
    new PdfBuilder(title, true)
  );
  return returnVal.toDocumentDefinition();
};

export default generateCookPlanDocumentDefinition
