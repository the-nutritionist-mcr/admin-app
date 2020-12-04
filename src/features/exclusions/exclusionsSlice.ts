import * as APITypes from "../../API";

import API, { GraphQLResult, graphqlOperation } from "@aws-amplify/api";

import {
  createExclusion as createExclusionMutation,
  deleteExclusion as deleteExclusionMutation,
  updateExclusion as updateExclusionMutation,
} from "../../graphql/mutations";

import type { AppState } from "../../lib/rootReducer";

import Exclusion from "../../domain/Exclusion";
import LoadingState from "../../types/LoadingState";

import apiRequestCreator from "../../lib/apiRequestCreator";
import convertNullsToUndefined from "../../lib/convertNullsToUndefined";
import { createSlice } from "@reduxjs/toolkit";
import { listExclusions } from "../../graphql/queries";

interface ExclusionsState {
  items: Exclusion[];
  page: number;
  loadingState: LoadingState;
  error?: string;
}

const initialState: ExclusionsState = {
  items: [],
  page: 0,
  loadingState: LoadingState.Idle,
};

const MALFORMED_RESPONSE = "Response from the server was malformed";

export const updateExclusion = apiRequestCreator(
  "exclusions/update",
  async (exclusion: Exclusion): Promise<Exclusion> => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      createdAt,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updatedAt,
      ...exclusionWithoutExclusions
    } = exclusion;
    const updateExclusionVariables: APITypes.UpdateExclusionMutationVariables = {
      input: exclusionWithoutExclusions,
    };

    const updateExclusionResult = (await API.graphql(
      graphqlOperation(updateExclusionMutation, updateExclusionVariables)
    )) as GraphQLResult<APITypes.UpdateExclusionMutation>;

    const updatedExclusion = updateExclusionResult.data?.updateExclusion;

    if (updatedExclusion) {
      return convertNullsToUndefined(updatedExclusion);
    }
    throw new Error(MALFORMED_RESPONSE);
  }
);

export const createExclusion = apiRequestCreator(
  "exclusions/create",
  async (exclusion: Exclusion): Promise<Exclusion> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...exclusionWithoutId } = exclusion;

    const createExclusionVariables: APITypes.CreateExclusionMutationVariables = {
      input: exclusionWithoutId,
    };

    const createExclusionResult = (await API.graphql(
      graphqlOperation(createExclusionMutation, createExclusionVariables)
    )) as GraphQLResult<APITypes.CreateExclusionMutation>;

    const createdExclusion = createExclusionResult.data?.createExclusion;

    if (createdExclusion) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { customers, recipes, ...returnExclusion } = createdExclusion;
      return returnExclusion;
    }

    throw new Error(MALFORMED_RESPONSE);
  }
);

export const fetchExclusions = apiRequestCreator(
  "exclusions/fetch",
  async (): Promise<Exclusion[]> => {
    const listExclusionsVariables: APITypes.ListExclusionsQueryVariables = {};

    const listExclusionsResult = (await API.graphql(
      graphqlOperation(listExclusions, listExclusionsVariables)
    )) as GraphQLResult<APITypes.ListExclusionsQuery>;

    const items = listExclusionsResult.data?.listExclusions?.items;

    type NotNull = <T>(thing: T | null) => thing is T;

    if (items) {
      return items
        .filter((Boolean as unknown) as NotNull)
        .map(convertNullsToUndefined)
        .map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { customers, recipes, ...newItem } = item;
          return newItem;
        });
    }

    throw new Error(MALFORMED_RESPONSE);
  }
);

export const removeExclusion = apiRequestCreator(
  "exclusions/remove",
  async (exclusion: Exclusion): Promise<string> => {
    const deleteExclusionVariables: APITypes.DeleteExclusionMutationVariables = {
      input: {
        id: exclusion.id,
      },
    };

    await API.graphql(
      graphqlOperation(deleteExclusionMutation, deleteExclusionVariables)
    );

    return exclusion.id;
  }
);

const exclusionsSlice = createSlice({
  name: "exclusions",
  initialState,
  reducers: {
    clearError: (state): void => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeExclusion.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items = state.items.filter((item) => item.id !== action.payload);
    });

    builder.addCase(updateExclusion.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      const index = state.items.findIndex(
        (item) => action.payload.id === item.id
      );
      state.items[index] = action.payload;
    });

    builder.addCase(createExclusion.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items.push(action.payload);
    });

    builder.addCase(fetchExclusions.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items = action.payload;
    });
  },
});

export default exclusionsSlice;

export const allExclusionsSelector = (state: AppState): Exclusion[] =>
  state.exclusions.items;
