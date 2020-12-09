const listRecipesQuery = `
query ListRecipesQuery {
  listRecipes {
    description
    id
    name
    potentialExclusions {
      allergen
      id
      name
    }
  }
}
`;

export default listRecipesQuery;
