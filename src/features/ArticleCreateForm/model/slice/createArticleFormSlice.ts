import { createSlice } from '@reduxjs/toolkit';

import type { ErrorAction } from '@/shared/types/api';

import { createArticle } from '../services/createArticle/createArticle';

import type { CreateArticleFormSchema } from '../types/createArticleFormSchema';

const initialState: CreateArticleFormSchema = {
  error: undefined,
  isLoading: false,
};

export const createArticleFormSlice = createSlice({
  name: 'createArticleForm',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.error = undefined;

        state.isLoading = true;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.error = undefined;

        state.isLoading = false;
      })
      .addCase(createArticle.rejected, (state, action: ErrorAction) => {
        state.error = action.error.message;

        state.isLoading = false;
      });
  },
});

export const { actions: createArticleFormActions } = createArticleFormSlice;
export const { reducer: createArticleFormReducer } = createArticleFormSlice;
