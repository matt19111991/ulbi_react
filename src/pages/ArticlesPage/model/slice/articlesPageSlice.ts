import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

import { Article, ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { SortOrder } from '@/shared/types/sort';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

import { ArticlesPageSchema } from '../types/articlesPageSchema';

/*
  для статей используем НОРМАЛИЗАЦИЮ ДАННЫХ:

  вместо массива статей будем использовать:
    - объект (ключ - 'id' статьи, значение - сама статья)
    - массив айдишников статей (для ссылок на сами статьи)

  эта оптимизация позволяет (например, при обновлении одной статьи):
    - не итерироваться по всему списку статей и по итогу менять всего одну статью,
      а менять точечно по ключу одну статью

    - избежать дублирования данных в 'Redux store' / локально:
     'article', 'editedArticle', 'draftArticle', 'onModerationArticle'

    - сложность не 'O(n)', а 'O(1)'
*/

// адаптер с настройками для нормализации данных
const articlesAdapter = createEntityAdapter<Article>({
  /*
    если уникальное значение у статьи будет не 'id', а 'articleId':
    selectId: (article) => article.articleId,

    массив с айдишниками будет отсортирован на основе поля 'title':
    sortComparer: (a, b) => a.title.localeCompare(b.title),
  */
});

// объект с селекторами для части стейта, которую хотим нормализовать
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const initialState: ArticlesPageSchema = {
  /*
    загрузили список статей => перешли на конкретную статью => вернулись обратно к списку =>
    снова началась подгрузка (а должен отобразиться предыдущий загруженный список)
    для того, чтобы отследить этот момент и прекратить ненужную подгрузку, заводим флаг 'inited'
  */
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
  type: ArticleType.ALL,
  view: ArticleView.PLATE,
};

export const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>(initialState),
  reducers: {
    initState: (state) => {
      /*
        'LocalStorage' все типы приводит к 'string'
        'as' нужен, чтобы вместо типа 'string' был тип 'ArticleView'
      */
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
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;

      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
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

        /*
          limit: 5, action.payload.length: 5 => (возможно) есть еще
          limit: 10, action.payload.length: 5 => больше нет
        */

        state.hasMore = action.payload.length >= state.limit;

        // для фильтров
        if (action.meta.arg?.replace) {
          articlesAdapter.setAll(state, action.payload);
          // для ленивой подгрузки
        } else {
          /*
            вызывается множество запросов, если доскроллить до конца любой страницы из-за 'IntersectionObserver'

            в этом случае нужно:
              - добавить в передаваемый callback 'fetchNextArticlesPage()' в 'IntersectionObserver' условие
                на подгрузку только в случае, если 'hasMore === true' && 'areLoading === false'

              - не полностью перезатирать данные:
                articlesAdapter.setAll(state, action.payload);

                а добавлять в конец:
          */

          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.areLoading = false;
        state.error = action.payload;
      }),
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
