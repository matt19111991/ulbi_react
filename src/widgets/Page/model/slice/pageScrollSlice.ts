import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PageScrollSchema } from '../types/PageScrollSchema';

const initialState: PageScrollSchema = {
  scroll: {},
};

export const pageScrollSlice = createSlice({
  name: 'pageScroll',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      action: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

export const { actions: pageScrollActions } = pageScrollSlice;
export const { reducer: pageScrollReducer } = pageScrollSlice;
