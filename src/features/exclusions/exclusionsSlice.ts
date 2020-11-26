import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";

import type { AppState } from "../../lib/store";

import Exclusion from "../../domain/Exclusion";

interface ExclusionsState {
  items: Exclusion[];
  page: number;
}

const initialState: ExclusionsState = {
  items: [],
  page: 0,
};

export const updateExclusion = createAsyncThunk(
  "exclusions/update",
  async (exclusion: Exclusion): Promise<Exclusion> => Promise.resolve(exclusion)
);

const exclusionsSlice = createSlice({
  name: "exclusions",
  initialState,
  reducers: {
    createExclusion: {
      reducer: (state, action: PayloadAction<Exclusion>): void => {
        state.items.push(action.payload);
      },
      prepare: (
        exclusion: Exclusion
      ): { payload: PayloadAction<Exclusion>["payload"] } => {
        return {
          payload: {
            ...exclusion,
            id: nanoid(),
          },
        };
      },
    },

    removeExclusion: (
      state,
      action: PayloadAction<Exclusion>
    ): typeof state => ({
      ...state,
      items: state.items.filter(
        (exclusion) => exclusion.id !== action.payload.id
      ),
    }),
    updateExclusion: (state, action: PayloadAction<Exclusion>): void => {
      const index = state.items.findIndex(
        (exclusion) => exclusion.id === action.payload.id
      );
      state.items[index] = { ...action.payload };
    },
  },
});

export default exclusionsSlice;

const { createExclusion, removeExclusion } = exclusionsSlice.actions;

export const allExclusionsSelector = (state: AppState): Exclusion[] =>
  state.exclusions.items;

export { createExclusion, removeExclusion };
