// DeepPartial - тип для отдельного участка 'state', чаще всего используется в тестах
import { DeepPartial } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';

import { getCounter } from './getCounter';

describe('getCounter', () => {
  test('should return counter state', () => {
    const state: DeepPartial<StateSchema> = {
      counter: {
        value: 10,
      },
    };

/*  'as' нужен, т.к. иначе ошибка: Property 'value' is optional in
    type 'DeepPartial<CounterSchema>' but required in type 'CounterSchema'.
*/  expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
  });
});
