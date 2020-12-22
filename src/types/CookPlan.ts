import Recipe from "../domain/Recipe";

type CookPlan = {
  recipe: Recipe;
  plan: {
    [variant: string]: {
      count: number;
      allergen: boolean;
      customisation: boolean;
    };
  };
}[];

export default CookPlan;
