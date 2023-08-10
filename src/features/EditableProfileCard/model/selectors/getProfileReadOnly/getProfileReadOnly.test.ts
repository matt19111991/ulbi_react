import { StateSchema } from '@/app/providers/StoreProvider';

import { getProfileReadOnly } from './getProfileReadOnly';

describe('getProfileReadOnly', () => {
  test('should return readonly status', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
      },
    };

    expect(getProfileReadOnly(state as StateSchema)).toBeTruthy();
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileReadOnly(state as StateSchema)).toBe(undefined);
  });
});
