import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { ErrorAction } from '@/shared/types/api';

import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';

import type { Article } from '../types/article';
import type { ArticleDetailsSchema } from '../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
  data: undefined,
  error: undefined,
  isLoading: false,
};

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchArticleById.rejected, (state, action: ErrorAction) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { reducer: articleDetailsReducer } = articleDetailsSlice;
