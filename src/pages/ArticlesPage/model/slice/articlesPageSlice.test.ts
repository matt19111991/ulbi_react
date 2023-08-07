import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { generateNormalizedArticles } from 'shared/lib/generateArticles/generateArticles';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

import { ArticlesPageSchema } from '../types/articlesPageSchema';

import { articlesPageActions, articlesPageReducer } from './articlesPageSlice';

const articles = generateNormalizedArticles(2);

describe('articlesPageSlice', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('test set init state', () => {
    test('article view list', () => {
      window.localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, ArticleView.LIST);

      const state: DeepPartial<ArticlesPageSchema> = {};

      const reducer = articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState(),
      );

      expect(reducer).toEqual({
        inited: true,
        limit: 4,
        view: ArticleView.LIST,
      });
    });

    test('article view plate', () => {
      window.localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, ArticleView.PLATE);

      const state: DeepPartial<ArticlesPageSchema> = {};

      const reducer = articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState(),
      );

      expect(reducer).toEqual({
        inited: true,
        limit: 9,
        view: ArticleView.PLATE,
      });
    });
  });

  test('test set page', () => {
    const state: DeepPartial<ArticlesPageSchema> = {};

    const reducer = articlesPageReducer(
      state as ArticlesPageSchema,
      articlesPageActions.setPage(5),
    );

    expect(reducer).toEqual({ page: 5 });
  });

  test('test set order', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      order: 'asc',
    };

    const reducer = articlesPageReducer(
      state as ArticlesPageSchema,
      articlesPageActions.setOrder('desc'),
    );

    expect(reducer).toEqual({ order: 'desc' });
  });

  test('test set search', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      search: '',
    };

    const reducer = articlesPageReducer(
      state as ArticlesPageSchema,
      articlesPageActions.setSearch('search_value'),
    );

    expect(reducer).toEqual({ search: 'search_value' });
  });

  test('test set sort', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      sort: ArticleSortField.CREATED,
    };

    const reducer = articlesPageReducer(
      state as ArticlesPageSchema,
      articlesPageActions.setSort(ArticleSortField.TITLE),
    );

    expect(reducer).toEqual({ sort: ArticleSortField.TITLE });
  });

  test('test set type', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      type: ArticleType.ECONOMICS,
    };

    const reducer = articlesPageReducer(
      state as ArticlesPageSchema,
      articlesPageActions.setType(ArticleType.SCIENCE),
    );

    expect(reducer).toEqual({ type: ArticleType.SCIENCE });
  });

  test('test set view', () => {
    window.localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, ArticleView.PLATE);

    const state: DeepPartial<ArticlesPageSchema> = {
      view: ArticleView.PLATE,
    };

    const reducer = articlesPageReducer(
      state as ArticlesPageSchema,
      articlesPageActions.setView(ArticleView.LIST),
    );

    expect(reducer).toEqual({ view: ArticleView.LIST });

    expect(window.localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY)).toBe(ArticleView.LIST);
  });

  describe('test fetch articles list pending', () => {
    test('replace true', () => {
      const state: DeepPartial<ArticlesPageSchema> = {
        areLoading: false,
        entities: {},
        error: 'Error',
        ids: [],
      };

      expect(
        articlesPageReducer(
          state as ArticlesPageSchema,
          fetchArticlesList.pending('', { replace: true }),
        ),
      ).toEqual({
        areLoading: true,
        entities: {},
        error: undefined,
        ids: [],
      });
    });

    test('replace false', () => {
      const state: DeepPartial<ArticlesPageSchema> = {
        areLoading: false,
        entities: {},
        error: 'Error',
        ids: [],
      };

      expect(
        articlesPageReducer(
          state as ArticlesPageSchema,
          fetchArticlesList.pending('', { replace: false }),
        ),
      ).toEqual({
        areLoading: true,
        entities: {},
        error: undefined,
        ids: [],
      });
    });

    test('empty replace argument', () => {
      const state: DeepPartial<ArticlesPageSchema> = {
        areLoading: false,
        entities: {},
        error: 'Error',
        ids: [],
      };

      expect(
        articlesPageReducer(
          state as ArticlesPageSchema,
          fetchArticlesList.pending('', {}),
        ),
      ).toEqual({
        areLoading: true,
        entities: {},
        error: undefined,
        ids: [],
      });
    });
  });

  test('test fetch articles list fulfilled', () => {
    const state: DeepPartial<ArticlesPageSchema> = {
      areLoading: true,
      entities: {
        [articles.entities['1'].id]: articles.entities['1'],
      },
      hasMore: true,
      ids: [articles.ids.at(0)],
      limit: 1,
      page: 1,
      view: ArticleView.PLATE,
    };

    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        fetchArticlesList.fulfilled([articles.entities['2']], '', undefined),
      ),
    ).toEqual({
      areLoading: false,
      entities: articles.entities,
      ids: articles.ids,
      hasMore: true,
      limit: 1,
      page: 1,
      view: ArticleView.PLATE,
    });
  });
});
