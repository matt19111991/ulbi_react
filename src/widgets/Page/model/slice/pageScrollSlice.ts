import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { PageScrollSchema } from '../types/page';

interface ScrollPositionPayload {
  path: string;
  position: number;
}

const initialState: PageScrollSchema = {
  scroll: {},
  smooth: false,
};

export const pageScrollSlice = createSlice({
  name: 'pageScroll',
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<ScrollPositionPayload>) => {
      const { path, position } = action.payload;

      state.scroll[path] = position;
    },
    toggleScrollSmooth: (state) => {
      state.smooth = !state.smooth;
    },
  },
});

export const { actions: pageScrollActions } = pageScrollSlice;
export const { reducer: pageScrollReducer } = pageScrollSlice;
