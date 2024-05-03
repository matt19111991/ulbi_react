import type { StateSchema } from '@/app/providers/StoreProvider';

import { getCounter } from './getCounter';

describe('getCounter', () => {
  test('should return counter state', () => {
    // 'DeepPartial' - тип для отдельного участка 'state', чаще всего используется в тестах
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    };

    expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getCounter(state as StateSchema)).toBeUndefined();
  });
});
