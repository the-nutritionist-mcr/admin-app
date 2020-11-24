import Recipe from "../domain/Recipe";

const nutsExclusion = {
  id: "0",
  name: "nuts",
  allergen: true,
};

const fishExclusion = {
  id: "1",
  name: "fish",
  allergen: false,
};

const mustardExclusion = {
  id: "2",
  name: "mustard",
  allergen: true,
};

const riceExclusion = {
  id: "3",
  name: "rice",
  allergen: false,
};

const recipes: Recipe[] = [
  {
    id: 0,
    name: "Stew",
    potentialExclusions: [nutsExclusion],
  },
  {
    id: 1,
    name: "Fish",
    potentialExclusions: [fishExclusion],
  },
  {
    id: 2,
    name: "Beef Stroganof",
    potentialExclusions: [],
  },
  {
    id: 3,
    name: "Salad",
    potentialExclusions: [nutsExclusion, mustardExclusion],
  },
  {
    id: 4,
    name: "Sandwich",
    potentialExclusions: [],
  },
  {
    id: 5,
    name: "Casserole",
    potentialExclusions: [mustardExclusion],
  },
  {
    id: 6,
    name: "Risotto",
    potentialExclusions: [riceExclusion],
  },
];

export default recipes;
