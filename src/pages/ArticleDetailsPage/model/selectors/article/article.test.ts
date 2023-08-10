import { StateSchema } from '@/app/providers/StoreProvider';

import { getCanEditArticle } from './article';

describe('article selectors', () => {
  describe('getCanEditArticle', () => {
    test('should return true', () => {
      const state: DeepPartial<StateSchema> = {
        articleDetails: {
          data: {
            id: '11',
            user: {
              id: '1',
              username: 'Jack',
            },
          },
        },
        user: {
          authData: {
            id: '1',
            username: 'Jack',
          },
        },
      };

      expect(getCanEditArticle(state as StateSchema)).toBeTruthy();
    });

    describe('should return false', () => {
      test('no article', () => {
        const state: DeepPartial<StateSchema> = {
          user: {
            authData: {
              id: '1',
              username: 'Jack',
            },
          },
        };

        expect(getCanEditArticle(state as StateSchema)).toBeFalsy();
      });

      test('no user', () => {
        const state: DeepPartial<StateSchema> = {
          articleDetails: {
            data: {
              id: '11',
              user: {
                id: '1',
                username: 'Jack',
              },
            },
          },
          user: {
            authData: {},
          },
        };

        expect(getCanEditArticle(state as StateSchema)).toBeFalsy();
      });

      test("user is not the article's author", () => {
        const state: DeepPartial<StateSchema> = {
          articleDetails: {
            data: {
              id: '11',
              user: {
                id: '1',
                username: 'Jack',
              },
            },
          },
          user: {
            authData: {
              id: '2',
              username: 'Mary',
            },
          },
        };

        expect(getCanEditArticle(state as StateSchema)).toBeFalsy();
      });

      test('empty state', () => {
        const state: DeepPartial<StateSchema> = {
          user: {
            authData: {},
          },
        };

        expect(getCanEditArticle(state as StateSchema)).toBeFalsy();
      });
    });
  });
});
