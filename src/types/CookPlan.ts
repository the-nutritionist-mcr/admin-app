import { Recipe } from "../models";

type CookPlan = {
  recipe: Recipe;
  plan: {
    [variant: string]: number;
  };
}[];

export default CookPlan;
