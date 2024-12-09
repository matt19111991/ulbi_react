import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article/testing';
import type { Article } from '@/entities/Article/testing';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { generateNormalizedArticles } from '@/shared/lib/generators/articles';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

import type { ArticlesPageSchema } from '../types/articlesPageSchema';

import { articlesPageActions, articlesPageReducer } from './articlesPageSlice';

const articles = generateNormalizedArticles(2);

describe('articlesPageSlice', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('sync actions', () => {
    test('test add a new article to the list', () => {
      window.localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, ArticleView.LIST);

      const state: DeepPartial<ArticlesPageSchema> = {
        entities: articles.entities,
        ids: articles.ids,
      };

      const newArticle: Article = {
        blocks: [],
        createdAt: '09.12.2024',
        id: '3',
        img: 'https://ik.imagekit.io/ably/ghost/prod/2023/12/choosing-the-best-javascript-frameworks-for-your-next-project.png?tr=w-1728,q-50',
        subtitle: 'Что нового в JS за 2023 год?',
        title: 'Javascript news',
        type: [ArticleType.IT],
        user: {
          id: '1',
          username: 'Jack',
        },
        views: 0,
      };

      const reducer = articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.addArticleToTheList(newArticle),
      );

      expect(reducer).toEqual({
        entities: {
          ...articles.entities,
          [newArticle.id]: newArticle,
        },
        ids: [...articles.ids, newArticle.id],
      });
    });

    test('test set init state for article view list', () => {
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

    test('test set init state for article view plate', () => {
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

    test('test set page', () => {
      const state: DeepPartial<ArticlesPageSchema> = {};

      const reducer = articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.setPage(5),
      );

      expect(reducer).toEqual({ page: 5 });
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
  });

  describe('async fetchArticlesList action', () => {
    describe('test set is pending', () => {
      const state: DeepPartial<ArticlesPageSchema> = {
        areLoading: false,
        entities: articles.entities,
        error: 'Article list error',
        ids: articles.ids,
      };

      test('replace true', () => {
        /*
          при тестировании 'extraReducers':
            - первый аргумент: любая строка (например, 'requestId')
            - второй аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'FetchArticlesListOptions'
        */
        expect(
          articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.pending('requestId', { replace: true }),
          ),
        ).toEqual({
          areLoading: true,
          entities: {},
          error: undefined,
          ids: [],
        });
      });

      test('replace false', () => {
        /*
          при тестировании 'extraReducers':
            - первый аргумент: любая строка (например, 'requestId')
            - второй аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'FetchArticlesListOptions'
        */
        expect(
          articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.pending('requestId', { replace: false }),
          ),
        ).toEqual({
          areLoading: true,
          entities: articles.entities,
          error: undefined,
          ids: articles.ids,
        });
      });

      test('empty replace argument', () => {
        /*
          при тестировании 'extraReducers':
            - первый аргумент: любая строка (например, 'requestId')
            - второй аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'undefined'
        */
        expect(
          articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.pending('requestId', undefined),
          ),
        ).toEqual({
          areLoading: true,
          entities: articles.entities,
          error: undefined,
          ids: articles.ids,
        });
      });
    });

    describe('test set is fulfilled', () => {
      const [storedArticleId, fetchedArticleId] = articles.ids;

      const state: DeepPartial<ArticlesPageSchema> = {
        areLoading: true,
        entities: {
          [storedArticleId]: articles.entities[storedArticleId],
        },
        hasMore: true,
        ids: [storedArticleId],
        limit: 1,
        page: 1,
        view: ArticleView.PLATE,
      };

      test('replace true', () => {
        /*
          при тестировании 'extraReducers':
            - первый аргумент: возвращаемый массив статей
            - второй аргумент: любая строка (например, 'requestId')
            - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'FetchArticlesListOptions'
        */
        expect(
          articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.fulfilled([articles.entities[fetchedArticleId]], 'requestId', {
              replace: true,
            }),
          ),
        ).toEqual({
          areLoading: false,
          entities: {
            [fetchedArticleId]: articles.entities[fetchedArticleId],
          },
          ids: [fetchedArticleId],
          hasMore: true,
          limit: 1,
          page: 1,
          view: ArticleView.PLATE,
        });
      });

      test('replace false', () => {
        /*
          при тестировании 'extraReducers':
            - первый аргумент: возвращаемый массив статей
            - второй аргумент: любая строка (например, 'requestId')
            - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'FetchArticlesListOptions'
        */
        expect(
          articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.fulfilled([articles.entities[fetchedArticleId]], 'requestId', {
              replace: false,
            }),
          ),
        ).toEqual({
          areLoading: false,
          entities: {
            [storedArticleId]: articles.entities[storedArticleId],
            [fetchedArticleId]: articles.entities[fetchedArticleId],
          },
          ids: [storedArticleId, fetchedArticleId],
          hasMore: true,
          limit: 1,
          page: 1,
          view: ArticleView.PLATE,
        });
      });

      test('empty replace argument', () => {
        /*
          при тестировании 'extraReducers':
            - первый аргумент: возвращаемый массив статей
            - второй аргумент: любая строка (например, 'requestId')
            - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае 'undefined'
        */
        expect(
          articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticlesList.fulfilled(
              [articles.entities[fetchedArticleId]],
              'requestId',
              undefined,
            ),
          ),
        ).toEqual({
          areLoading: false,
          entities: {
            [storedArticleId]: articles.entities[storedArticleId],
            [fetchedArticleId]: articles.entities[fetchedArticleId],
          },
          ids: [storedArticleId, fetchedArticleId],
          hasMore: true,
          limit: 1,
          page: 1,
          view: ArticleView.PLATE,
        });
      });
    });

    describe('test set is rejected', () => {
      test('rejects with error', () => {
        const errorMessage = 'Jest test error';

        const error = new Error(errorMessage);

        const state: DeepPartial<ArticlesPageSchema> = {
          areLoading: true,
          error: undefined,
        };

        /*
          при тестировании 'extraReducers':
            - второй аргумент: любая строка (например, 'requestId')
            - третий аргумент: аргументы, передаваемые в 'async thunk', в нашем случае аргумент неважен
        */
        const reducer = articlesPageReducer(
          state as ArticlesPageSchema,
          fetchArticlesList.rejected(error, 'requestId', undefined),
        );

        expect(reducer).toEqual({ areLoading: false, error: errorMessage });
      });
    });
  });
});
