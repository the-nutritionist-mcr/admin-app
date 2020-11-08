export const allergens = [
  "Celery",
  "Gluten Cereal",
  "Crustacean",
  "Fish",
  "Lupin",
  "Milk",
  "Molluscs",
  "Mustard",
  "Nuts",
  "Peanuts",
  "Sesame Seeds",
  "Soya",
  "Sulpher Dioxide",
];

export default interface Recipe {
  id: number;
  name: string;
  description?: string;
  allergens: string[];
}
