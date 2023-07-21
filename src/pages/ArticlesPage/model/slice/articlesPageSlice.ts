import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';

import { Article, ArticleView } from 'entities/Article';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { fetchArticlesList } from '../services/fetchArticlesList';

import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
  // selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const initialState: ArticlesPageSchema = {
  areLoading: false,
  entities: {},
  error: undefined,
  ids: [],
  view: ArticleView.PLATE,
};

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>(initialState),
  reducers: {
    initState: (state) => {
      state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
    },
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;

      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchArticlesList.pending, (state) => {
      state.areLoading = true;
      state.error = undefined;
    })
    .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
      state.areLoading = false;

      articlesAdapter.setAll(state, action.payload);
    })
    .addCase(fetchArticlesList.rejected, (state, action) => {
      state.areLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
