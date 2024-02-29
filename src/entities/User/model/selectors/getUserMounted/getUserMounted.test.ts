import type { StateSchema } from '@/app/providers/StoreProvider';

import { getUserMounted } from './getUserMounted';

describe('getUserMounted', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        mounted: true,
      },
    };

    expect(getUserMounted(state as StateSchema)).toBeTruthy();
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {},
    };

    expect(getUserMounted(state as StateSchema)).toBeFalsy();
  });
});
