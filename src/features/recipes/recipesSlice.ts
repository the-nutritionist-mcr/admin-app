import * as APITypes from "../../API";

import API, { GraphQLResult, graphqlOperation } from "@aws-amplify/api";

import {
  createRecipe as createRecipeMutation,
  deleteRecipe as deleteRecipeMutation,
  updateRecipe as updateRecipeMutation,
} from "../../graphql/mutations";

import type { AppState } from "../../lib/rootReducer";

import LoadingState from "../../types/LoadingState";
import Recipe from "../../domain/Recipe";

import apiRequestCreator from "../../lib/apiRequestCreator";
import convertNullsToUndefined from "../../lib/convertNullsToUndefined";
import { createSlice } from "@reduxjs/toolkit";
import { listRecipes } from "../../graphql/queries";

interface RecipesState {
  items: Recipe[];
  page: number;
  loadingState: LoadingState;
  error?: string;
}

const initialState: RecipesState = {
  items: [],
  page: 0,
  loadingState: LoadingState.Idle,
};

const MALFORMED_RESPONSE = "Response from the server was malformed";

type RawRecipe = Exclude<
  Exclude<
    Exclude<APITypes.ListRecipesQuery["listRecipes"], null>["items"],
    null
  >[number],
  null
>;

const mapRecipe = (recipe: RawRecipe): Recipe => {
  const deNulledRecipe = convertNullsToUndefined(recipe);

  return {
    ...deNulledRecipe,
    potentialExclusions: [],
  };
};

export const updateRecipe = apiRequestCreator(
  "recipes/update",
  async (recipe: Recipe): Promise<Recipe> => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createdAt,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updatedAt,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      potentialExclusions,
      ...recipeWithoutRecipes
    } = recipe;
    const updateRecipeVariables: APITypes.UpdateRecipeMutationVariables = {
      input: recipeWithoutRecipes,
    };

    const updateRecipeResult = (await API.graphql(
      graphqlOperation(updateRecipeMutation, updateRecipeVariables)
    )) as GraphQLResult<APITypes.UpdateRecipeMutation>;

    const updatedRecipe = updateRecipeResult.data?.updateRecipe;

    if (updatedRecipe) {
      return mapRecipe(updatedRecipe);
    }
    throw new Error(MALFORMED_RESPONSE);
  }
);

export const createRecipe = apiRequestCreator(
  "recipes/create",
  async (recipe: Recipe): Promise<Recipe> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, potentialExclusions, ...recipeWithoutId } = recipe;

    const createRecipeVariables: APITypes.CreateRecipeMutationVariables = {
      input: recipeWithoutId,
    };

    const createRecipeResult = (await API.graphql(
      graphqlOperation(createRecipeMutation, createRecipeVariables)
    )) as GraphQLResult<APITypes.CreateRecipeMutation>;

    const createdRecipe = createRecipeResult.data?.createRecipe;

    if (createdRecipe) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return mapRecipe(createdRecipe);
    }

    throw new Error(MALFORMED_RESPONSE);
  }
);

export const fetchRecipes = apiRequestCreator(
  "recipes/fetch",
  async (): Promise<Recipe[]> => {
    const listRecipesVariables: APITypes.ListRecipesQueryVariables = {};

    const listRecipesResult = (await API.graphql(
      graphqlOperation(listRecipes, listRecipesVariables)
    )) as GraphQLResult<APITypes.ListRecipesQuery>;

    const items = listRecipesResult.data?.listRecipes?.items;

    type NotNull = <T>(thing: T | null) => thing is T;

    if (items) {
      return items
        .filter((Boolean as unknown) as NotNull)
        .map(mapRecipe)
        .map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { ...newItem } = item;
          return newItem;
        });
    }

    throw new Error(MALFORMED_RESPONSE);
  }
);

export const removeRecipe = apiRequestCreator(
  "recipes/remove",
  async (recipe: Recipe): Promise<string> => {
    const deleteRecipeVariables: APITypes.DeleteRecipeMutationVariables = {
      input: {
        id: recipe.id,
      },
    };

    await API.graphql(
      graphqlOperation(deleteRecipeMutation, deleteRecipeVariables)
    );

    return recipe.id;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    clearError: (state): void => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeRecipe.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items = state.items.filter((item) => item.id !== action.payload);
    });

    builder.addCase(updateRecipe.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      const index = state.items.findIndex(
        (item) => action.payload.id === item.id
      );
      state.items[index] = action.payload;
    });

    builder.addCase(createRecipe.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items.push(action.payload);
    });

    builder.addCase(fetchRecipes.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items = action.payload;
    });
  },
});

export default recipesSlice;

export const allRecipesSelector = (state: AppState): Recipe[] =>
  state.recipes.items;

export const errorSelector = (state: AppState): string | undefined =>
  state.recipes.error;
