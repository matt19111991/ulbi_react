import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';
import type { StateSchema } from '@/app/providers/StoreProvider';

import { getCounterValue, useCounterValue } from './getCounterValue';

describe('getCounterValue selectors', () => {
  describe('getCounterValue', () => {
    test('should return counter value', () => {
      const state: DeepPartial<StateSchema> = {
        counter: {
          value: 10,
        },
      };

      expect(getCounterValue(state as StateSchema)).toBe(10);
    });

    test('should work with empty state', () => {
      const state: DeepPartial<StateSchema> = { counter: {} };

      expect(getCounterValue(state as StateSchema)).toBeUndefined();
    });
  });

  describe('useCounterValue', () => {
    test('should return hook and correct selector value', () => {
      const state: DeepPartial<StateSchema> = {
        counter: {
          value: 10,
        },
      };

      const ComponentWrapper = ({ children }: { children: ReactNode }) => (
        <StoreProvider initialState={state}>{children}</StoreProvider>
      );

      /*
       'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае числовое значение счетчика
      */
      const { result } = renderHook(() => useCounterValue(), { wrapper: ComponentWrapper });

      expect(result.current).toBe(10);
    });
  });
});
