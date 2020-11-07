export const allergens = ["fish", "nuts"];

export default interface Recipe {
  id: number;
  name: string;
  description?: string;
  allergens: string[];
}
