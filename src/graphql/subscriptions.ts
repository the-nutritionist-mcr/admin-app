/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateExclusion = /* GraphQL */ `
  subscription OnCreateExclusion {
    onCreateExclusion {
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
            paymentDayOfMonth
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
export const onUpdateExclusion = /* GraphQL */ `
  subscription OnUpdateExclusion {
    onUpdateExclusion {
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
            paymentDayOfMonth
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
export const onDeleteExclusion = /* GraphQL */ `
  subscription OnDeleteExclusion {
    onDeleteExclusion {
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
            paymentDayOfMonth
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
export const onCreateCustomerExclusion = /* GraphQL */ `
  subscription OnCreateCustomerExclusion {
    onCreateCustomerExclusion {
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
              paymentDayOfMonth
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
        paymentDayOfMonth
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
              paymentDayOfMonth
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
export const onUpdateCustomerExclusion = /* GraphQL */ `
  subscription OnUpdateCustomerExclusion {
    onUpdateCustomerExclusion {
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
              paymentDayOfMonth
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
        paymentDayOfMonth
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
              paymentDayOfMonth
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
export const onDeleteCustomerExclusion = /* GraphQL */ `
  subscription OnDeleteCustomerExclusion {
    onDeleteCustomerExclusion {
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
              paymentDayOfMonth
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
        paymentDayOfMonth
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
              paymentDayOfMonth
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
export const onCreateRecipeExclusion = /* GraphQL */ `
  subscription OnCreateRecipeExclusion {
    onCreateRecipeExclusion {
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
              paymentDayOfMonth
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
export const onUpdateRecipeExclusion = /* GraphQL */ `
  subscription OnUpdateRecipeExclusion {
    onUpdateRecipeExclusion {
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
              paymentDayOfMonth
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
export const onDeleteRecipeExclusion = /* GraphQL */ `
  subscription OnDeleteRecipeExclusion {
    onDeleteRecipeExclusion {
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
              paymentDayOfMonth
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
export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe {
    onCreateRecipe {
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
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe {
    onUpdateRecipe {
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
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe {
    onDeleteRecipe {
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
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
      id
      firstName
      surname
      salutation
      address
      telephone
      startDate
      paymentDayOfMonth
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
            paymentDayOfMonth
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
      id
      firstName
      surname
      salutation
      address
      telephone
      startDate
      paymentDayOfMonth
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
            paymentDayOfMonth
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
      id
      firstName
      surname
      salutation
      address
      telephone
      startDate
      paymentDayOfMonth
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
            paymentDayOfMonth
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
