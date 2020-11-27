import * as APITypes from "../../API";

import API, { GraphQLResult, graphqlOperation } from "@aws-amplify/api";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "../../lib/store";

import Exclusion from "../../domain/Exclusion";
import LoadingState from "../../types/LoadingState";

import convertNullsToUndefined from "../../lib/convertNullsToUndefined";
import { createExclusion as createExclusionMutation } from "../../graphql/mutations";
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

export const updateExclusion = createAsyncThunk(
  "exclusions/update",
  async (exclusion: Exclusion): Promise<Exclusion> => Promise.resolve(exclusion)
);

export const createExclusion = createAsyncThunk(
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
      return createdExclusion;
    }

    throw new Error(MALFORMED_RESPONSE);
  }
);

export const fetchExclusions = createAsyncThunk(
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
        .map(convertNullsToUndefined);
    }

    throw new Error(MALFORMED_RESPONSE);
  }
);

export const removeExclusion = createAsyncThunk(
  "exclusions/remove",
  async (exclusion: Exclusion): Promise<string> => Promise.resolve(exclusion.id)
);

const exclusionsSlice = createSlice({
  name: "exclusions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateExclusion.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(removeExclusion.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(updateExclusion.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });

    builder.addCase(removeExclusion.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });

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

    builder.addCase(createExclusion.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(createExclusion.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items.push(action.payload);
    });

    builder.addCase(createExclusion.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });

    builder.addCase(fetchExclusions.pending, (state): void => {
      state.loadingState = LoadingState.Loading;
    });

    builder.addCase(fetchExclusions.fulfilled, (state, action): void => {
      state.loadingState = LoadingState.Succeeeded;
      state.items = action.payload;
    });

    builder.addCase(fetchExclusions.rejected, (state, action): void => {
      state.loadingState = LoadingState.Failed;
      state.error = action.error.message;
    });
  },
});

export default exclusionsSlice;

export const allExclusionsSelector = (state: AppState): Exclusion[] =>
  state.exclusions.items;
