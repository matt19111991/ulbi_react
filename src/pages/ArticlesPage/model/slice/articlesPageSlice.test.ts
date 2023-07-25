import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from 'entities/Article';

import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

import { ArticlesPageSchema } from '../types/articlesPageSchema';

import { articlesPageActions, articlesPageReducer } from './articlesPageSlice';

const articles: Article[] = [
  {
    id: '1',
    blocks: [],
    createdAt: '26.02.2023',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    subtitle: 'Что нового в S за 2023 год?',
    title: 'Javascript news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 1022,
  },
  {
    id: '2',
    blocks: [],
    createdAt: '19.01.2023',
    img: 'https://w7.pngwing.com/pngs/234/329/png-transparent-python-logo-thumbnail.png',
    subtitle: 'Что нового у Python за 2023 год?',
    title: 'Python news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 845,
  },
];

const normalizedEntities = {
  1: articles.at(0),
  2: articles.at(1),
};

const normalizedIds = ['1', '2'];

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
    const [firstArticle, secondArticle] = articles;

    const state: DeepPartial<ArticlesPageSchema> = {
      areLoading: true,
      entities: {
        [firstArticle.id]: firstArticle,
      },
      hasMore: true,
      ids: [firstArticle.id],
      limit: 1,
      page: 1,
      view: ArticleView.PLATE,
    };

    expect(
      articlesPageReducer(
        state as ArticlesPageSchema,
        fetchArticlesList.fulfilled([secondArticle], '', undefined),
      ),
    ).toEqual({
      areLoading: false,
      entities: normalizedEntities,
      ids: normalizedIds,
      hasMore: true,
      limit: 1,
      page: 1,
      view: ArticleView.PLATE,
    });
  });
});
