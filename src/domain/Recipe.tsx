export const allergens = ["fish", "nuts"];

export default interface Recipe {
  name: string;
  description?: string;
  allergen: string[];
}
