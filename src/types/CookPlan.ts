import Recipe from "../domain/Recipe";

type CookPlan = {
  recipe: Recipe;
  plan: {
    [variant: string]: number;
  };
}[];

export default CookPlan;
