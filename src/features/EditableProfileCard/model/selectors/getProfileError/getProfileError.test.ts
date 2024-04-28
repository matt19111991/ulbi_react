import type { StateSchema } from '@/app/providers/StoreProvider';

import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: 'Profile error',
      },
    };

    expect(getProfileError(state as StateSchema)).toBe('Profile error');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileError(state as StateSchema)).toBeUndefined();
  });
});
