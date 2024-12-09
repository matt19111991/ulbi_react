import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setGlobalDevModeChecks } from 'reselect';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import type { Article } from '@/entities/Article';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import type { ErrorAction } from '@/shared/types/api';
import type { SortOrder } from '@/shared/types/sort';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import type { FetchArticlesListOptions } from '../services/fetchArticlesList/fetchArticlesList';

import type { ArticlesPageSchema } from '../types/articlesPageSchema';

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
export const getArticles = articlesAdapter.getSelectors<StateSchema>((state) => {
  /*
    отключаем предупреждения вида: "An input selector returned a different
    result when passed same arguments. This means your output selector will
    likely run more frequently than intended. Avoid returning a new reference
    inside your input selector, e.g.
      'createSelector(
        [state => state.articles.map(article => article.id)],
        articleIds => articleIds.length
      )' при использовании 'createEntityAdapter'

    затем обратно включаем предупреждение после вызова
   'useSelector(getArticles.selectAll)' в компоненте:
   'setGlobalDevModeChecks({ inputStabilityCheck: 'always' });'
 */
  setGlobalDevModeChecks({ inputStabilityCheck: 'never' });

  return state.articlesPage || articlesAdapter.getInitialState();
});

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
  initialState: articlesAdapter.getInitialState(initialState),
  reducers: {
    addArticleToTheList: (state, action: PayloadAction<Article>) => {
      const article = action.payload;

      state.entities[article.id] = article;

      state.ids = [...state.ids, article.id];
    },
    initState: (state) => {
      // 'localStorage' все типы приводит к 'string', поэтому используем 'as ArticleView'
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
      .addCase(
        fetchArticlesList.pending,
        (
          state,
          action: PayloadAction<
            undefined, // ничего не возвращается
            string, // 'action type'
            { arg: FetchArticlesListOptions | undefined } // 'meta'
          >,
        ) => {
          state.areLoading = true;
          state.error = undefined;

          if (action.meta.arg?.replace) {
            // при фильтрации всегда получаем новое состояние и обнуляем старое при 'pending'
            articlesAdapter.removeAll(state);
          }
        },
      )
      .addCase(
        fetchArticlesList.fulfilled,
        (
          state,
          action: PayloadAction<
            Article[], // возвращаемое значение
            string, // 'action type'
            { arg: FetchArticlesListOptions | undefined } // 'meta'
          >,
        ) => {
          state.areLoading = false;

          /*
            'limit: 5, action.payload.length: 5' => (возможно) есть еще
            'limit: 10, action.payload.length: 5' => больше нет
          */
          state.hasMore = action.payload.length >= state.limit;

          if (action.meta.arg?.replace) {
            // при фильтрации заменяем все существующие данные новыми значениями
            articlesAdapter.setAll(state, action.payload);
          } else {
            /*
              при ленивой подгрузке вызывается множество запросов, если доскроллить до конца
              любой страницы из-за 'IntersectionObserver'

              в этом случае нужно:
                - добавить в 'fetchNextArticlesPage()' условие на подгрузку только в случае,
                  если 'hasMore === true' && 'areLoading === false'

                - не полностью перезатирать данные: 'articlesAdapter.setAll(state, action.payload);',
                  а добавлять данные в конец:       'articlesAdapter.addMany(state, action.payload);'
            */
            articlesAdapter.addMany(state, action.payload);
          }
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action: ErrorAction) => {
        state.areLoading = false;

        state.error = action.error.message;
      }),
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
