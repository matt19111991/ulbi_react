import type { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'Jack',
      },
    };

    expect(getLoginUsername(state as StateSchema)).toBe('Jack');
  });

  test('should work with empty state and return default value', () => {
    const state = {};

    expect(getLoginUsername(state as StateSchema)).toBe('');
  });
});
