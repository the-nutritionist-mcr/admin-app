import Recipe from "../../domain/Recipe";

const recipes: Recipe[] = [
  {
    id: 0,
    name: "Stew",
    allergens: ["nuts"],
  },
  {
    id: 1,
    name: "Fish",
    allergens: ["fish"],
  },
  {
    id: 2,
    name: "Beef Stroganof",
    allergens: [],
  },
  {
    id: 3,
    name: "Salad",
    allergens: ["nuts", "mustard"],
  },
  {
    id: 4,
    name: "Sandwich",
    allergens: [],
  },
  {
    id: 5,
    name: "Casserole",
    allergens: ["mustard"],
  },
  {
    id: 6,
    name: "Risotto",
    allergens: ["rice"],
  },
];

export default recipes;
