const listRecipesQuery = `
query ListRecipesQuery {
  listRecipes {
    description
    id
    name
    shortName
    hotOrCold
    potentialExclusions {
      allergen
      id
      name
    }
  }
}
`;

export default listRecipesQuery;
