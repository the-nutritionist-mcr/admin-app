/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateExclusionInput = {
  id?: string | null;
  name: string;
  allergen: boolean;
};

export type ModelExclusionConditionInput = {
  name?: ModelStringInput | null;
  allergen?: ModelBooleanInput | null;
  and?: Array<ModelExclusionConditionInput | null> | null;
  or?: Array<ModelExclusionConditionInput | null> | null;
  not?: ModelExclusionConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateExclusionInput = {
  id: string;
  name?: string | null;
  allergen?: boolean | null;
};

export type DeleteExclusionInput = {
  id?: string | null;
};

export type CreateCustomerExclusionInput = {
  id?: string | null;
  customerId: string;
  exclusionId: string;
};

export type ModelCustomerExclusionConditionInput = {
  customerId?: ModelIDInput | null;
  exclusionId?: ModelIDInput | null;
  and?: Array<ModelCustomerExclusionConditionInput | null> | null;
  or?: Array<ModelCustomerExclusionConditionInput | null> | null;
  not?: ModelCustomerExclusionConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateCustomerExclusionInput = {
  id: string;
  customerId?: string | null;
  exclusionId?: string | null;
};

export type DeleteCustomerExclusionInput = {
  id?: string | null;
};

export type CreateRecipeExclusionInput = {
  id?: string | null;
  recipeId: string;
  exclusionId: string;
  recipePotentialExclusionsId?: string | null;
};

export type ModelRecipeExclusionConditionInput = {
  recipeId?: ModelIDInput | null;
  exclusionId?: ModelIDInput | null;
  and?: Array<ModelRecipeExclusionConditionInput | null> | null;
  or?: Array<ModelRecipeExclusionConditionInput | null> | null;
  not?: ModelRecipeExclusionConditionInput | null;
};

export type UpdateRecipeExclusionInput = {
  id: string;
  recipeId?: string | null;
  exclusionId?: string | null;
  recipePotentialExclusionsId?: string | null;
};

export type DeleteRecipeExclusionInput = {
  id?: string | null;
};

export type CreateRecipeInput = {
  id?: string | null;
  name: string;
  description?: string | null;
};

export type ModelRecipeConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelRecipeConditionInput | null> | null;
  or?: Array<ModelRecipeConditionInput | null> | null;
  not?: ModelRecipeConditionInput | null;
};

export type UpdateRecipeInput = {
  id: string;
  name?: string | null;
  description?: string | null;
};

export type DeleteRecipeInput = {
  id?: string | null;
};

export type CreateCustomerInput = {
  id?: string | null;
  firstName: string;
  surname: string;
  salutation: string;
  address: string;
  telephone: string;
  startDate?: string | null;
  paymentDayOfMonth?: number | null;
  notes?: string | null;
  email: string;
  pauseStart?: string | null;
  pauseEnd?: string | null;
  daysPerWeek: number;
  plan: PlanInput;
  legacyPrice?: number | null;
  snack: string;
  breakfast: boolean;
};

export type PlanInput = {
  name: string;
  mealsPerDay: number;
  costPerMeal: number;
  category: string;
};

export type ModelCustomerConditionInput = {
  firstName?: ModelStringInput | null;
  surname?: ModelStringInput | null;
  salutation?: ModelStringInput | null;
  address?: ModelStringInput | null;
  telephone?: ModelStringInput | null;
  startDate?: ModelStringInput | null;
  paymentDayOfMonth?: ModelIntInput | null;
  notes?: ModelStringInput | null;
  email?: ModelStringInput | null;
  pauseStart?: ModelStringInput | null;
  pauseEnd?: ModelStringInput | null;
  daysPerWeek?: ModelIntInput | null;
  legacyPrice?: ModelIntInput | null;
  snack?: ModelStringInput | null;
  breakfast?: ModelBooleanInput | null;
  and?: Array<ModelCustomerConditionInput | null> | null;
  or?: Array<ModelCustomerConditionInput | null> | null;
  not?: ModelCustomerConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateCustomerInput = {
  id: string;
  firstName?: string | null;
  surname?: string | null;
  salutation?: string | null;
  address?: string | null;
  telephone?: string | null;
  startDate?: string | null;
  paymentDayOfMonth?: number | null;
  notes?: string | null;
  email?: string | null;
  pauseStart?: string | null;
  pauseEnd?: string | null;
  daysPerWeek?: number | null;
  plan?: PlanInput | null;
  legacyPrice?: number | null;
  snack?: string | null;
  breakfast?: boolean | null;
};

export type DeleteCustomerInput = {
  id?: string | null;
};

export type ModelExclusionFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  allergen?: ModelBooleanInput | null;
  and?: Array<ModelExclusionFilterInput | null> | null;
  or?: Array<ModelExclusionFilterInput | null> | null;
  not?: ModelExclusionFilterInput | null;
};

export type ModelRecipeFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelRecipeFilterInput | null> | null;
  or?: Array<ModelRecipeFilterInput | null> | null;
  not?: ModelRecipeFilterInput | null;
};

export type ModelCustomerFilterInput = {
  id?: ModelIDInput | null;
  firstName?: ModelStringInput | null;
  surname?: ModelStringInput | null;
  salutation?: ModelStringInput | null;
  address?: ModelStringInput | null;
  telephone?: ModelStringInput | null;
  startDate?: ModelStringInput | null;
  paymentDayOfMonth?: ModelIntInput | null;
  notes?: ModelStringInput | null;
  email?: ModelStringInput | null;
  pauseStart?: ModelStringInput | null;
  pauseEnd?: ModelStringInput | null;
  daysPerWeek?: ModelIntInput | null;
  legacyPrice?: ModelIntInput | null;
  snack?: ModelStringInput | null;
  breakfast?: ModelBooleanInput | null;
  and?: Array<ModelCustomerFilterInput | null> | null;
  or?: Array<ModelCustomerFilterInput | null> | null;
  not?: ModelCustomerFilterInput | null;
};

export type CreateExclusionMutationVariables = {
  input: CreateExclusionInput;
  condition?: ModelExclusionConditionInput | null;
};

export type CreateExclusionMutation = {
  createExclusion: {
    __typename: "Exclusion";
    id: string;
    name: string;
    allergen: boolean;
    customers: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    recipes: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateExclusionMutationVariables = {
  input: UpdateExclusionInput;
  condition?: ModelExclusionConditionInput | null;
};

export type UpdateExclusionMutation = {
  updateExclusion: {
    __typename: "Exclusion";
    id: string;
    name: string;
    allergen: boolean;
    customers: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    recipes: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteExclusionMutationVariables = {
  input: DeleteExclusionInput;
  condition?: ModelExclusionConditionInput | null;
};

export type DeleteExclusionMutation = {
  deleteExclusion: {
    __typename: "Exclusion";
    id: string;
    name: string;
    allergen: boolean;
    customers: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    recipes: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateCustomerExclusionMutationVariables = {
  input: CreateCustomerExclusionInput;
  condition?: ModelCustomerExclusionConditionInput | null;
};

export type CreateCustomerExclusionMutation = {
  createCustomerExclusion: {
    __typename: "CustomerExclusion";
    id: string;
    customerId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    customer: {
      __typename: "Customer";
      id: string;
      firstName: string;
      surname: string;
      salutation: string;
      address: string;
      telephone: string;
      startDate: string | null;
      paymentDayOfMonth: number | null;
      notes: string | null;
      email: string;
      pauseStart: string | null;
      pauseEnd: string | null;
      daysPerWeek: number;
      plan: {
        __typename: "Plan";
        name: string;
        mealsPerDay: number;
        costPerMeal: number;
        category: string;
      };
      legacyPrice: number | null;
      snack: string;
      breakfast: boolean;
      exclusions: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateCustomerExclusionMutationVariables = {
  input: UpdateCustomerExclusionInput;
  condition?: ModelCustomerExclusionConditionInput | null;
};

export type UpdateCustomerExclusionMutation = {
  updateCustomerExclusion: {
    __typename: "CustomerExclusion";
    id: string;
    customerId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    customer: {
      __typename: "Customer";
      id: string;
      firstName: string;
      surname: string;
      salutation: string;
      address: string;
      telephone: string;
      startDate: string | null;
      paymentDayOfMonth: number | null;
      notes: string | null;
      email: string;
      pauseStart: string | null;
      pauseEnd: string | null;
      daysPerWeek: number;
      plan: {
        __typename: "Plan";
        name: string;
        mealsPerDay: number;
        costPerMeal: number;
        category: string;
      };
      legacyPrice: number | null;
      snack: string;
      breakfast: boolean;
      exclusions: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteCustomerExclusionMutationVariables = {
  input: DeleteCustomerExclusionInput;
  condition?: ModelCustomerExclusionConditionInput | null;
};

export type DeleteCustomerExclusionMutation = {
  deleteCustomerExclusion: {
    __typename: "CustomerExclusion";
    id: string;
    customerId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    customer: {
      __typename: "Customer";
      id: string;
      firstName: string;
      surname: string;
      salutation: string;
      address: string;
      telephone: string;
      startDate: string | null;
      paymentDayOfMonth: number | null;
      notes: string | null;
      email: string;
      pauseStart: string | null;
      pauseEnd: string | null;
      daysPerWeek: number;
      plan: {
        __typename: "Plan";
        name: string;
        mealsPerDay: number;
        costPerMeal: number;
        category: string;
      };
      legacyPrice: number | null;
      snack: string;
      breakfast: boolean;
      exclusions: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateRecipeExclusionMutationVariables = {
  input: CreateRecipeExclusionInput;
  condition?: ModelRecipeExclusionConditionInput | null;
};

export type CreateRecipeExclusionMutation = {
  createRecipeExclusion: {
    __typename: "RecipeExclusion";
    id: string;
    recipeId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    recipe: {
      __typename: "Recipe";
      id: string;
      name: string;
      description: string | null;
      potentialExclusions: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateRecipeExclusionMutationVariables = {
  input: UpdateRecipeExclusionInput;
  condition?: ModelRecipeExclusionConditionInput | null;
};

export type UpdateRecipeExclusionMutation = {
  updateRecipeExclusion: {
    __typename: "RecipeExclusion";
    id: string;
    recipeId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    recipe: {
      __typename: "Recipe";
      id: string;
      name: string;
      description: string | null;
      potentialExclusions: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteRecipeExclusionMutationVariables = {
  input: DeleteRecipeExclusionInput;
  condition?: ModelRecipeExclusionConditionInput | null;
};

export type DeleteRecipeExclusionMutation = {
  deleteRecipeExclusion: {
    __typename: "RecipeExclusion";
    id: string;
    recipeId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    recipe: {
      __typename: "Recipe";
      id: string;
      name: string;
      description: string | null;
      potentialExclusions: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateRecipeMutationVariables = {
  input: CreateRecipeInput;
  condition?: ModelRecipeConditionInput | null;
};

export type CreateRecipeMutation = {
  createRecipe: {
    __typename: "Recipe";
    id: string;
    name: string;
    description: string | null;
    potentialExclusions: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateRecipeMutationVariables = {
  input: UpdateRecipeInput;
  condition?: ModelRecipeConditionInput | null;
};

export type UpdateRecipeMutation = {
  updateRecipe: {
    __typename: "Recipe";
    id: string;
    name: string;
    description: string | null;
    potentialExclusions: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteRecipeMutationVariables = {
  input: DeleteRecipeInput;
  condition?: ModelRecipeConditionInput | null;
};

export type DeleteRecipeMutation = {
  deleteRecipe: {
    __typename: "Recipe";
    id: string;
    name: string;
    description: string | null;
    potentialExclusions: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateCustomerMutationVariables = {
  input: CreateCustomerInput;
  condition?: ModelCustomerConditionInput | null;
};

export type CreateCustomerMutation = {
  createCustomer: {
    __typename: "Customer";
    id: string;
    firstName: string;
    surname: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate: string | null;
    paymentDayOfMonth: number | null;
    notes: string | null;
    email: string;
    pauseStart: string | null;
    pauseEnd: string | null;
    daysPerWeek: number;
    plan: {
      __typename: "Plan";
      name: string;
      mealsPerDay: number;
      costPerMeal: number;
      category: string;
    };
    legacyPrice: number | null;
    snack: string;
    breakfast: boolean;
    exclusions: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateCustomerMutationVariables = {
  input: UpdateCustomerInput;
  condition?: ModelCustomerConditionInput | null;
};

export type UpdateCustomerMutation = {
  updateCustomer: {
    __typename: "Customer";
    id: string;
    firstName: string;
    surname: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate: string | null;
    paymentDayOfMonth: number | null;
    notes: string | null;
    email: string;
    pauseStart: string | null;
    pauseEnd: string | null;
    daysPerWeek: number;
    plan: {
      __typename: "Plan";
      name: string;
      mealsPerDay: number;
      costPerMeal: number;
      category: string;
    };
    legacyPrice: number | null;
    snack: string;
    breakfast: boolean;
    exclusions: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteCustomerMutationVariables = {
  input: DeleteCustomerInput;
  condition?: ModelCustomerConditionInput | null;
};

export type DeleteCustomerMutation = {
  deleteCustomer: {
    __typename: "Customer";
    id: string;
    firstName: string;
    surname: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate: string | null;
    paymentDayOfMonth: number | null;
    notes: string | null;
    email: string;
    pauseStart: string | null;
    pauseEnd: string | null;
    daysPerWeek: number;
    plan: {
      __typename: "Plan";
      name: string;
      mealsPerDay: number;
      costPerMeal: number;
      category: string;
    };
    legacyPrice: number | null;
    snack: string;
    breakfast: boolean;
    exclusions: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetExclusionQueryVariables = {
  id: string;
};

export type GetExclusionQuery = {
  getExclusion: {
    __typename: "Exclusion";
    id: string;
    name: string;
    allergen: boolean;
    customers: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    recipes: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListExclusionsQueryVariables = {
  filter?: ModelExclusionFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListExclusionsQuery = {
  listExclusions: {
    __typename: "ModelExclusionConnection";
    items: Array<{
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetRecipeQueryVariables = {
  id: string;
};

export type GetRecipeQuery = {
  getRecipe: {
    __typename: "Recipe";
    id: string;
    name: string;
    description: string | null;
    potentialExclusions: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListRecipesQueryVariables = {
  filter?: ModelRecipeFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListRecipesQuery = {
  listRecipes: {
    __typename: "ModelRecipeConnection";
    items: Array<{
      __typename: "Recipe";
      id: string;
      name: string;
      description: string | null;
      potentialExclusions: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetCustomerQueryVariables = {
  id: string;
};

export type GetCustomerQuery = {
  getCustomer: {
    __typename: "Customer";
    id: string;
    firstName: string;
    surname: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate: string | null;
    paymentDayOfMonth: number | null;
    notes: string | null;
    email: string;
    pauseStart: string | null;
    pauseEnd: string | null;
    daysPerWeek: number;
    plan: {
      __typename: "Plan";
      name: string;
      mealsPerDay: number;
      costPerMeal: number;
      category: string;
    };
    legacyPrice: number | null;
    snack: string;
    breakfast: boolean;
    exclusions: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListCustomersQueryVariables = {
  filter?: ModelCustomerFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListCustomersQuery = {
  listCustomers: {
    __typename: "ModelCustomerConnection";
    items: Array<{
      __typename: "Customer";
      id: string;
      firstName: string;
      surname: string;
      salutation: string;
      address: string;
      telephone: string;
      startDate: string | null;
      paymentDayOfMonth: number | null;
      notes: string | null;
      email: string;
      pauseStart: string | null;
      pauseEnd: string | null;
      daysPerWeek: number;
      plan: {
        __typename: "Plan";
        name: string;
        mealsPerDay: number;
        costPerMeal: number;
        category: string;
      };
      legacyPrice: number | null;
      snack: string;
      breakfast: boolean;
      exclusions: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateExclusionSubscription = {
  onCreateExclusion: {
    __typename: "Exclusion";
    id: string;
    name: string;
    allergen: boolean;
    customers: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    recipes: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateExclusionSubscription = {
  onUpdateExclusion: {
    __typename: "Exclusion";
    id: string;
    name: string;
    allergen: boolean;
    customers: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    recipes: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteExclusionSubscription = {
  onDeleteExclusion: {
    __typename: "Exclusion";
    id: string;
    name: string;
    allergen: boolean;
    customers: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    recipes: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateCustomerExclusionSubscription = {
  onCreateCustomerExclusion: {
    __typename: "CustomerExclusion";
    id: string;
    customerId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    customer: {
      __typename: "Customer";
      id: string;
      firstName: string;
      surname: string;
      salutation: string;
      address: string;
      telephone: string;
      startDate: string | null;
      paymentDayOfMonth: number | null;
      notes: string | null;
      email: string;
      pauseStart: string | null;
      pauseEnd: string | null;
      daysPerWeek: number;
      plan: {
        __typename: "Plan";
        name: string;
        mealsPerDay: number;
        costPerMeal: number;
        category: string;
      };
      legacyPrice: number | null;
      snack: string;
      breakfast: boolean;
      exclusions: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateCustomerExclusionSubscription = {
  onUpdateCustomerExclusion: {
    __typename: "CustomerExclusion";
    id: string;
    customerId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    customer: {
      __typename: "Customer";
      id: string;
      firstName: string;
      surname: string;
      salutation: string;
      address: string;
      telephone: string;
      startDate: string | null;
      paymentDayOfMonth: number | null;
      notes: string | null;
      email: string;
      pauseStart: string | null;
      pauseEnd: string | null;
      daysPerWeek: number;
      plan: {
        __typename: "Plan";
        name: string;
        mealsPerDay: number;
        costPerMeal: number;
        category: string;
      };
      legacyPrice: number | null;
      snack: string;
      breakfast: boolean;
      exclusions: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteCustomerExclusionSubscription = {
  onDeleteCustomerExclusion: {
    __typename: "CustomerExclusion";
    id: string;
    customerId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    customer: {
      __typename: "Customer";
      id: string;
      firstName: string;
      surname: string;
      salutation: string;
      address: string;
      telephone: string;
      startDate: string | null;
      paymentDayOfMonth: number | null;
      notes: string | null;
      email: string;
      pauseStart: string | null;
      pauseEnd: string | null;
      daysPerWeek: number;
      plan: {
        __typename: "Plan";
        name: string;
        mealsPerDay: number;
        costPerMeal: number;
        category: string;
      };
      legacyPrice: number | null;
      snack: string;
      breakfast: boolean;
      exclusions: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateRecipeExclusionSubscription = {
  onCreateRecipeExclusion: {
    __typename: "RecipeExclusion";
    id: string;
    recipeId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    recipe: {
      __typename: "Recipe";
      id: string;
      name: string;
      description: string | null;
      potentialExclusions: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateRecipeExclusionSubscription = {
  onUpdateRecipeExclusion: {
    __typename: "RecipeExclusion";
    id: string;
    recipeId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    recipe: {
      __typename: "Recipe";
      id: string;
      name: string;
      description: string | null;
      potentialExclusions: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteRecipeExclusionSubscription = {
  onDeleteRecipeExclusion: {
    __typename: "RecipeExclusion";
    id: string;
    recipeId: string;
    exclusionId: string;
    exclusion: {
      __typename: "Exclusion";
      id: string;
      name: string;
      allergen: boolean;
      customers: {
        __typename: "ModelCustomerExclusionConnection";
        items: Array<{
          __typename: "CustomerExclusion";
          id: string;
          customerId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          customer: {
            __typename: "Customer";
            id: string;
            firstName: string;
            surname: string;
            salutation: string;
            address: string;
            telephone: string;
            startDate: string | null;
            paymentDayOfMonth: number | null;
            notes: string | null;
            email: string;
            pauseStart: string | null;
            pauseEnd: string | null;
            daysPerWeek: number;
            legacyPrice: number | null;
            snack: string;
            breakfast: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      recipes: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    recipe: {
      __typename: "Recipe";
      id: string;
      name: string;
      description: string | null;
      potentialExclusions: {
        __typename: "ModelRecipeExclusionConnection";
        items: Array<{
          __typename: "RecipeExclusion";
          id: string;
          recipeId: string;
          exclusionId: string;
          exclusion: {
            __typename: "Exclusion";
            id: string;
            name: string;
            allergen: boolean;
            createdAt: string;
            updatedAt: string;
          } | null;
          recipe: {
            __typename: "Recipe";
            id: string;
            name: string;
            description: string | null;
            createdAt: string;
            updatedAt: string;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateRecipeSubscription = {
  onCreateRecipe: {
    __typename: "Recipe";
    id: string;
    name: string;
    description: string | null;
    potentialExclusions: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateRecipeSubscription = {
  onUpdateRecipe: {
    __typename: "Recipe";
    id: string;
    name: string;
    description: string | null;
    potentialExclusions: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteRecipeSubscription = {
  onDeleteRecipe: {
    __typename: "Recipe";
    id: string;
    name: string;
    description: string | null;
    potentialExclusions: {
      __typename: "ModelRecipeExclusionConnection";
      items: Array<{
        __typename: "RecipeExclusion";
        id: string;
        recipeId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        recipe: {
          __typename: "Recipe";
          id: string;
          name: string;
          description: string | null;
          potentialExclusions: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateCustomerSubscription = {
  onCreateCustomer: {
    __typename: "Customer";
    id: string;
    firstName: string;
    surname: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate: string | null;
    paymentDayOfMonth: number | null;
    notes: string | null;
    email: string;
    pauseStart: string | null;
    pauseEnd: string | null;
    daysPerWeek: number;
    plan: {
      __typename: "Plan";
      name: string;
      mealsPerDay: number;
      costPerMeal: number;
      category: string;
    };
    legacyPrice: number | null;
    snack: string;
    breakfast: boolean;
    exclusions: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateCustomerSubscription = {
  onUpdateCustomer: {
    __typename: "Customer";
    id: string;
    firstName: string;
    surname: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate: string | null;
    paymentDayOfMonth: number | null;
    notes: string | null;
    email: string;
    pauseStart: string | null;
    pauseEnd: string | null;
    daysPerWeek: number;
    plan: {
      __typename: "Plan";
      name: string;
      mealsPerDay: number;
      costPerMeal: number;
      category: string;
    };
    legacyPrice: number | null;
    snack: string;
    breakfast: boolean;
    exclusions: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteCustomerSubscription = {
  onDeleteCustomer: {
    __typename: "Customer";
    id: string;
    firstName: string;
    surname: string;
    salutation: string;
    address: string;
    telephone: string;
    startDate: string | null;
    paymentDayOfMonth: number | null;
    notes: string | null;
    email: string;
    pauseStart: string | null;
    pauseEnd: string | null;
    daysPerWeek: number;
    plan: {
      __typename: "Plan";
      name: string;
      mealsPerDay: number;
      costPerMeal: number;
      category: string;
    };
    legacyPrice: number | null;
    snack: string;
    breakfast: boolean;
    exclusions: {
      __typename: "ModelCustomerExclusionConnection";
      items: Array<{
        __typename: "CustomerExclusion";
        id: string;
        customerId: string;
        exclusionId: string;
        exclusion: {
          __typename: "Exclusion";
          id: string;
          name: string;
          allergen: boolean;
          customers: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          recipes: {
            __typename: "ModelRecipeExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        customer: {
          __typename: "Customer";
          id: string;
          firstName: string;
          surname: string;
          salutation: string;
          address: string;
          telephone: string;
          startDate: string | null;
          paymentDayOfMonth: number | null;
          notes: string | null;
          email: string;
          pauseStart: string | null;
          pauseEnd: string | null;
          daysPerWeek: number;
          plan: {
            __typename: "Plan";
            name: string;
            mealsPerDay: number;
            costPerMeal: number;
            category: string;
          };
          legacyPrice: number | null;
          snack: string;
          breakfast: boolean;
          exclusions: {
            __typename: "ModelCustomerExclusionConnection";
            nextToken: string | null;
          } | null;
          createdAt: string;
          updatedAt: string;
        } | null;
        createdAt: string;
        updatedAt: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};
