/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getExclusion = /* GraphQL */ `
  query GetExclusion($id: ID!) {
    getExclusion(id: $id) {
      id
      name
      allergen
      customers {
        items {
          id
          customerId
          exclusionId
          exclusion {
            id
            name
            allergen
            customers {
              nextToken
            }
            recipes {
              nextToken
            }
            createdAt
            updatedAt
          }
          customer {
            id
            firstName
            surname
            salutation
            address
            telephone
            startDate
            paymentDateOfMonth
            notes
            email
            pauseStart
            pauseEnd
            daysPerWeek
            plan {
              name
              mealsPerDay
              costPerMeal
              category
            }
            legacyPrice
            snack
            breakfast
            exclusions {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      recipes {
        items {
          id
          recipeId
          exclusionId
          exclusion {
            id
            name
            allergen
            customers {
              nextToken
            }
            recipes {
              nextToken
            }
            createdAt
            updatedAt
          }
          recipe {
            id
            name
            description
            potentialExclusions {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listExclusions = /* GraphQL */ `
  query ListExclusions(
    $filter: ModelExclusionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExclusions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        allergen
        customers {
          items {
            id
            customerId
            exclusionId
            exclusion {
              id
              name
              allergen
              createdAt
              updatedAt
            }
            customer {
              id
              firstName
              surname
              salutation
              address
              telephone
              startDate
              paymentDateOfMonth
              notes
              email
              pauseStart
              pauseEnd
              daysPerWeek
              legacyPrice
              snack
              breakfast
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        recipes {
          items {
            id
            recipeId
            exclusionId
            exclusion {
              id
              name
              allergen
              createdAt
              updatedAt
            }
            recipe {
              id
              name
              description
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      name
      description
      potentialExclusions {
        items {
          id
          recipeId
          exclusionId
          exclusion {
            id
            name
            allergen
            customers {
              nextToken
            }
            recipes {
              nextToken
            }
            createdAt
            updatedAt
          }
          recipe {
            id
            name
            description
            potentialExclusions {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        potentialExclusions {
          items {
            id
            recipeId
            exclusionId
            exclusion {
              id
              name
              allergen
              createdAt
              updatedAt
            }
            recipe {
              id
              name
              description
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      firstName
      surname
      salutation
      address
      telephone
      startDate
      paymentDateOfMonth
      notes
      email
      pauseStart
      pauseEnd
      daysPerWeek
      plan {
        name
        mealsPerDay
        costPerMeal
        category
      }
      legacyPrice
      snack
      breakfast
      exclusions {
        items {
          id
          customerId
          exclusionId
          exclusion {
            id
            name
            allergen
            customers {
              nextToken
            }
            recipes {
              nextToken
            }
            createdAt
            updatedAt
          }
          customer {
            id
            firstName
            surname
            salutation
            address
            telephone
            startDate
            paymentDateOfMonth
            notes
            email
            pauseStart
            pauseEnd
            daysPerWeek
            plan {
              name
              mealsPerDay
              costPerMeal
              category
            }
            legacyPrice
            snack
            breakfast
            exclusions {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        surname
        salutation
        address
        telephone
        startDate
        paymentDateOfMonth
        notes
        email
        pauseStart
        pauseEnd
        daysPerWeek
        plan {
          name
          mealsPerDay
          costPerMeal
          category
        }
        legacyPrice
        snack
        breakfast
        exclusions {
          items {
            id
            customerId
            exclusionId
            exclusion {
              id
              name
              allergen
              createdAt
              updatedAt
            }
            customer {
              id
              firstName
              surname
              salutation
              address
              telephone
              startDate
              paymentDateOfMonth
              notes
              email
              pauseStart
              pauseEnd
              daysPerWeek
              legacyPrice
              snack
              breakfast
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
