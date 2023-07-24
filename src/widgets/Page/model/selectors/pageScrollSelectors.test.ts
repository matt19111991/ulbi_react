import { StateSchema } from 'app/providers/StoreProvider';

import { getPageScroll, getPageScrollByPath } from './pageScrollSelectors';

describe('page scroll selectors', () => {
  describe('getPageScroll', () => {
    test('should return scroll', () => {
      const state: DeepPartial<StateSchema> = {
        pageScroll: {
          scroll: {
            'test page': 500,
          },
        },
      };

      expect(getPageScroll(state as StateSchema)).toEqual({ 'test page': 500 });
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {
        pageScroll: {},
      };

      expect(getPageScroll(state as StateSchema)).toBe(undefined);
    });
  });

  describe('getPageScrollByPath', () => {
    test('should return scroll value', () => {
      const state: DeepPartial<StateSchema> = {
        pageScroll: {
          scroll: {
            'test page': 500,
          },
        },
      };

      expect(getPageScrollByPath(state as StateSchema, 'test page')).toBe(500);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {
        pageScroll: {
          scroll: {},
        },
      };

      expect(getPageScrollByPath(state as StateSchema, '')).toBe(0);
    });
  });
});
