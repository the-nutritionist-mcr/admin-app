import { base } from "grommet";

const formatPlanItem = (
  text: string,
  planItem: { allergen: boolean; customisation: boolean }
) => {
  const color = planItem.customisation
    ? base.global?.colors?.["status-error"]
    : "#000000";

  const finalColor = planItem.allergen ? base.global?.colors?.brand : color;

  const bold = finalColor !== "#000000";

  return {
    bold,
    markerColor: finalColor,
    color: finalColor,
    text,
  };
};

export default formatPlanItem;
