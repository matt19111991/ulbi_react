import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';

import { Article, ArticleSortField, ArticleView } from 'entities/Article';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { SortOrder } from 'shared/types/sort';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
  // selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const initialState: ArticlesPageSchema = {
  inited: false,

  areLoading: false,
  entities: {},
  error: undefined,
  hasMore: true,
  ids: [],
  limit: 9,
  order: 'asc',
  page: 1,
  search: '',
  sort: ArticleSortField.CREATED,
  view: ArticleView.PLATE,
};

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>(initialState),
  reducers: {
    initState: (state) => {
      const storedView = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;

      state.inited = true;
      state.limit = storedView === ArticleView.LIST ? 4 : 9;
      state.view = storedView;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;

      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchArticlesList.pending, (state, action) => {
      state.areLoading = true;
      state.error = undefined;

      if (action.meta.arg?.replace) {
        // для фильтров всегда получаем новое состояние и обнуляем старое при 'pending'
        articlesAdapter.removeAll(state);
      }
    })
    .addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.areLoading = false;
      state.hasMore = action.payload.length > 0;

      if (action.meta.arg?.replace) { // для фильтров
        articlesAdapter.setAll(state, action.payload);
      } else { // для ленивой подгрузки
/*      вызывается множество запросов, если доскроллить до конца любой страницы из-за 'IntersectionObserver'

        в этом случае нужно:
        - добавить в передаваемый callback 'fetchNextArticlesPage()' в 'IntersectionObserver' условие
          на подгрузку только в случае, если 'hasMore === true' && 'areLoading === false'

        - не полностью перезатирать данные:
        articlesAdapter.setAll(state, action.payload);

        а добавлять в конец:
  */    articlesAdapter.addMany(state, action.payload);
      }
    })
    .addCase(fetchArticlesList.rejected, (state, action) => {
      state.areLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
