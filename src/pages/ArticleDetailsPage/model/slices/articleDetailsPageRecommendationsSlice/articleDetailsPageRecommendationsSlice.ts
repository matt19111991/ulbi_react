import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';

import { fetchArticleRecommendations } from '../../services/fetchArticleRecommendations/fetchArticleRecommendations';

import { ArticleDetailsRecommendationsSchema } from '../../types/ArticleDetailsRecommendationsSchema';

const initialState: ArticleDetailsRecommendationsSchema = {
  areLoading: false,
  entities: {},
  error: undefined,
  ids: [],
};

const recommendationsAdapter = createEntityAdapter<Article>({
  // selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

export const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendations',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.areLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.areLoading = false;

        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.areLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleDetailsPageRecommendationsActions } =
  articleDetailsPageRecommendationsSlice;

export const { reducer: articleDetailsPageRecommendationsReducer } =
  articleDetailsPageRecommendationsSlice;
