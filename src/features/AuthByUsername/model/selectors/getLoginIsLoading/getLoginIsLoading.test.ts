import type { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLoginIsLoading', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    };

    expect(getLoginIsLoading(state as StateSchema)).toBeTruthy();
  });

  test('should work with empty state and return default value', () => {
    const state = {};

    expect(getLoginIsLoading(state as StateSchema)).toBeFalsy();
  });
});
