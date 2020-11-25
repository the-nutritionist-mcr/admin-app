/* eslint-disable import/prefer-default-export */
export const schema = {
  models: {
    Exclusion: {
      name: "Exclusion",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        allergen: {
          name: "allergen",
          isArray: false,
          type: "Boolean",
          isRequired: true,
          attributes: [],
        },
        customers: {
          name: "customers",
          isArray: true,
          type: {
            model: "CustomerExclusion",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: false,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "exclusion",
          },
        },
        recipes: {
          name: "recipes",
          isArray: true,
          type: {
            model: "RecipeExclusion",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: false,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "exclusion",
          },
        },
      },
      syncable: true,
      pluralName: "Exclusions",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
    CustomerExclusion: {
      name: "CustomerExclusion",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        exclusion: {
          name: "exclusion",
          isArray: false,
          type: {
            model: "Exclusion",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "exclusionId",
          },
        },
        customer: {
          name: "customer",
          isArray: false,
          type: {
            model: "Customer",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "customerId",
          },
        },
      },
      syncable: true,
      pluralName: "CustomerExclusions",
      attributes: [
        {
          type: "model",
          properties: {
            queries: null,
          },
        },
        {
          type: "key",
          properties: {
            name: "byCustomer",
            fields: ["customerId", "exclusionId"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byExclusion",
            fields: ["exclusionId", "customerId"],
          },
        },
      ],
    },
    Customer: {
      name: "Customer",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        firstName: {
          name: "firstName",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        surname: {
          name: "surname",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        salutation: {
          name: "salutation",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        address: {
          name: "address",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        telephone: {
          name: "telephone",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        startDate: {
          name: "startDate",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        paymentDateOfMonth: {
          name: "paymentDateOfMonth",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        notes: {
          name: "notes",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        email: {
          name: "email",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        pauseStart: {
          name: "pauseStart",
          isArray: false,
          type: "AWSDate",
          isRequired: false,
          attributes: [],
        },
        pauseEnd: {
          name: "pauseEnd",
          isArray: false,
          type: "AWSDate",
          isRequired: false,
          attributes: [],
        },
        daysPerWeek: {
          name: "daysPerWeek",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        plan: {
          name: "plan",
          isArray: false,
          type: {
            nonModel: "Plan",
          },
          isRequired: true,
          attributes: [],
        },
        legacyPrice: {
          name: "legacyPrice",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        snack: {
          name: "snack",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        breakfast: {
          name: "breakfast",
          isArray: false,
          type: "Boolean",
          isRequired: true,
          attributes: [],
        },
        exclusions: {
          name: "exclusions",
          isArray: true,
          type: {
            model: "CustomerExclusion",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: false,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "customer",
          },
        },
      },
      syncable: true,
      pluralName: "Customers",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
    RecipeExclusion: {
      name: "RecipeExclusion",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        recipeId: {
          name: "recipeId",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        exclusion: {
          name: "exclusion",
          isArray: false,
          type: {
            model: "Exclusion",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "exclusionId",
          },
        },
        recipe: {
          name: "recipe",
          isArray: false,
          type: {
            model: "Recipe",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "HAS_ONE",
            associatedWith: "id",
          },
        },
        recipePotentialExclusionsId: {
          name: "recipePotentialExclusionsId",
          isArray: false,
          type: "ID",
          isRequired: false,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: "RecipeExclusions",
      attributes: [
        {
          type: "model",
          properties: {
            queries: null,
          },
        },
        {
          type: "key",
          properties: {
            name: "byRecipe",
            fields: ["recipeId", "exclusionId"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byExclusion",
            fields: ["exclusionId", "recipeId"],
          },
        },
      ],
    },
    Recipe: {
      name: "Recipe",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        description: {
          name: "description",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        potentialExclusions: {
          name: "potentialExclusions",
          isArray: true,
          type: {
            model: "RecipeExclusion",
          },
          isRequired: true,
          attributes: [],
          isArrayNullable: false,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "recipePotentialExclusionsId",
          },
        },
      },
      syncable: true,
      pluralName: "Recipes",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
  },
  enums: {},
  nonModels: {
    Plan: {
      name: "Plan",
      fields: {
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        mealsPerDay: {
          name: "mealsPerDay",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        costPerMeal: {
          name: "costPerMeal",
          isArray: false,
          type: "Int",
          isRequired: true,
          attributes: [],
        },
        category: {
          name: "category",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
      },
    },
  },
  version: "0e73d07bd9a44c1ff32bc47f5551b689",
};
/* eslint-enable import/prefer-default-export */
