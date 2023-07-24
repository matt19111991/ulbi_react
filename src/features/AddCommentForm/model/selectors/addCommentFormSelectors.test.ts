import { StateSchema } from 'app/providers/StoreProvider';

import { getAddCommentFormError, getAddCommentFormText } from './addCommentFormSelectors';

describe('add comment form selectors', () => {
  describe('getAddCommentFormText', () => {
    test('should return text', () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {
          text: 'New comment',
        },
      };

      expect(getAddCommentFormText(state as StateSchema)).toBe('New comment');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getAddCommentFormText(state as StateSchema)).toBe('');
    });
  });

  describe('getAddCommentFormError', () => {
    test('should return error', () => {
      const state: DeepPartial<StateSchema> = {
        addCommentForm: {
          error: 'Error',
        },
      };

      expect(getAddCommentFormError(state as StateSchema)).toBe('Error');
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = {};

      expect(getAddCommentFormError(state as StateSchema)).toBe(undefined);
    });
  });
});
