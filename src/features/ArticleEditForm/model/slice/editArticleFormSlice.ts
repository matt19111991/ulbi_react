import { createSlice } from '@reduxjs/toolkit';

import { editArticle } from '../services/editArticle/editArticle';

import type { EditArticleFormSchema } from '../types/editArticleFormSchema';

const initialState: EditArticleFormSchema = {
  error: undefined,
  isLoading: false,
};

export const editArticleFormSlice = createSlice({
  name: 'editArticleForm',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editArticle.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(editArticle.fulfilled, (state) => {
        state.error = undefined;
        state.isLoading = false;
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: editArticleFormActions } = editArticleFormSlice;
export const { reducer: editArticleFormReducer } = editArticleFormSlice;
