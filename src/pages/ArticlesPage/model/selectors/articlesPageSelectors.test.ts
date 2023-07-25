import { StateSchema } from 'app/providers/StoreProvider';

import { ArticleSortField, ArticleType, ArticleView } from 'entities/Article';

import {
  getArticlesPageAreLoading,
  getArticlesPageError,
  getArticlesPageHasMore,
  getArticlesPageInited,
  getArticlesPageLimit,
  getArticlesPageNumber,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from './articlesPageSelectors';

describe('articlesPageSelectors', () => {
  describe('getArticlesPageAreLoading', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          areLoading: true,
        },
      };

      expect(getArticlesPageAreLoading(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageAreLoading(state as StateSchema)).toBeFalsy();
    });
  });

  describe('getArticlesPageError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          error: 'Error',
        },
      };

      expect(getArticlesPageError(state as StateSchema)).toBe('Error');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageError(state as StateSchema)).toBe(undefined);
    });
  });

  describe('getArticlesPageHasMore', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          hasMore: true,
        },
      };

      expect(getArticlesPageHasMore(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageHasMore(state as StateSchema)).toBeFalsy();
    });
  });

  describe('getArticlesPageInited', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          inited: true,
        },
      };

      expect(getArticlesPageInited(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageInited(state as StateSchema)).toBeFalsy();
    });
  });

  describe('getArticlesPageLimit', () => {
    test('should return limit value', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          limit: 4,
        },
      };

      expect(getArticlesPageLimit(state as StateSchema)).toBe(4);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageLimit(state as StateSchema)).toBe(undefined);
    });
  });

  describe('getArticlesPageNumber', () => {
    test('should return page number value', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          page: 5,
        },
      };

      expect(getArticlesPageNumber(state as StateSchema)).toBe(5);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageNumber(state as StateSchema)).toBe(1);
    });
  });

  describe('getArticlesPageOrder', () => {
    test('should return order', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          order: 'desc',
        },
      };

      expect(getArticlesPageOrder(state as StateSchema)).toBe('desc');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageOrder(state as StateSchema)).toBe('asc');
    });
  });

  describe('getArticlesPageSearch', () => {
    test('should return search value', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          search: 'search_value',
        },
      };

      expect(getArticlesPageSearch(state as StateSchema)).toBe('search_value');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageSearch(state as StateSchema)).toBe('');
    });
  });

  describe('getArticlesPageSort', () => {
    test('should return sort', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          sort: ArticleSortField.TITLE,
        },
      };

      expect(getArticlesPageSort(state as StateSchema)).toBe(ArticleSortField.TITLE);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageSort(state as StateSchema)).toBe(ArticleSortField.CREATED);
    });
  });

  describe('getArticlesPageType', () => {
    test('should return type', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          type: ArticleType.SCIENCE,
        },
      };

      expect(getArticlesPageType(state as StateSchema)).toBe(ArticleType.SCIENCE);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageType(state as StateSchema)).toBe(ArticleType.ALL);
    });
  });

  describe('getArticlesPageView', () => {
    test('should return page view value', () => {
      const state: DeepPartial<StateSchema> = {
        articlesPage: {
          view: ArticleView.LIST,
        },
      };

      expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.LIST);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.PLATE);
    });
  });
});
