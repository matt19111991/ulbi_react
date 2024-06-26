import type { StateSchema } from '@/app/providers/StoreProvider';

import { getPageScroll, getPageScrollByPath, getPageScrollSmooth } from './pageScrollSelectors';

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

      expect(getPageScroll(state as StateSchema)).toBeUndefined();
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

  describe('getPageScrollSmooth', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        pageScroll: {
          smooth: true,
        },
      };

      expect(getPageScrollSmooth(state as StateSchema)).toBeTruthy();
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {
        pageScroll: {},
      };

      expect(getPageScrollSmooth(state as StateSchema)).toBeUndefined();
    });
  });
});
