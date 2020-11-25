/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createExclusion = /* GraphQL */ `
  mutation CreateExclusion(
    $input: CreateExclusionInput!
    $condition: ModelExclusionConditionInput
  ) {
    createExclusion(input: $input, condition: $condition) {
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
export const updateExclusion = /* GraphQL */ `
  mutation UpdateExclusion(
    $input: UpdateExclusionInput!
    $condition: ModelExclusionConditionInput
  ) {
    updateExclusion(input: $input, condition: $condition) {
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
export const deleteExclusion = /* GraphQL */ `
  mutation DeleteExclusion(
    $input: DeleteExclusionInput!
    $condition: ModelExclusionConditionInput
  ) {
    deleteExclusion(input: $input, condition: $condition) {
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
export const createCustomerExclusion = /* GraphQL */ `
  mutation CreateCustomerExclusion(
    $input: CreateCustomerExclusionInput!
    $condition: ModelCustomerExclusionConditionInput
  ) {
    createCustomerExclusion(input: $input, condition: $condition) {
      id
      customerId
      exclusionId
      exclusion {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomerExclusion = /* GraphQL */ `
  mutation UpdateCustomerExclusion(
    $input: UpdateCustomerExclusionInput!
    $condition: ModelCustomerExclusionConditionInput
  ) {
    updateCustomerExclusion(input: $input, condition: $condition) {
      id
      customerId
      exclusionId
      exclusion {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomerExclusion = /* GraphQL */ `
  mutation DeleteCustomerExclusion(
    $input: DeleteCustomerExclusionInput!
    $condition: ModelCustomerExclusionConditionInput
  ) {
    deleteCustomerExclusion(input: $input, condition: $condition) {
      id
      customerId
      exclusionId
      exclusion {
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
      createdAt
      updatedAt
    }
  }
`;
export const createRecipeExclusion = /* GraphQL */ `
  mutation CreateRecipeExclusion(
    $input: CreateRecipeExclusionInput!
    $condition: ModelRecipeExclusionConditionInput
  ) {
    createRecipeExclusion(input: $input, condition: $condition) {
      id
      recipeId
      exclusionId
      exclusion {
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
      recipe {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateRecipeExclusion = /* GraphQL */ `
  mutation UpdateRecipeExclusion(
    $input: UpdateRecipeExclusionInput!
    $condition: ModelRecipeExclusionConditionInput
  ) {
    updateRecipeExclusion(input: $input, condition: $condition) {
      id
      recipeId
      exclusionId
      exclusion {
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
      recipe {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteRecipeExclusion = /* GraphQL */ `
  mutation DeleteRecipeExclusion(
    $input: DeleteRecipeExclusionInput!
    $condition: ModelRecipeExclusionConditionInput
  ) {
    deleteRecipeExclusion(input: $input, condition: $condition) {
      id
      recipeId
      exclusionId
      exclusion {
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
      recipe {
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
      createdAt
      updatedAt
    }
  }
`;
export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
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
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
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
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
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
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
