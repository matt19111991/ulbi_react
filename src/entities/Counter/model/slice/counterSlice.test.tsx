import type { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import type { CounterSchema } from '../types/counterSchema';

import { counterActions, counterReducer, useCounterActions } from './counterSlice';

describe('counterSlice', () => {
  describe('sync actions', () => {
    test('test decrement', () => {
      const state: CounterSchema = { value: 10 };

      const reducer = counterReducer(state, counterActions.decrement());

      expect(reducer).toEqual({ value: 9 });
    });

    test('test increment', () => {
      const state: CounterSchema = { value: 10 };

      const reducer = counterReducer(state, counterActions.increment());

      expect(reducer).toEqual({ value: 11 });
    });

    test('should work with empty state', () => {
      const reducer = counterReducer(undefined, counterActions.increment());

      expect(reducer).toEqual({ value: 1 });
    });
  });

  describe('useCounterActions', () => {
    test('should return hook and correct actions object', () => {
      const ComponentWrapper = ({ children }: { children: ReactNode }) => (
        // важен только сам 'StoreProvider', 'initialState' можно не передавать
        <StoreProvider>{children}</StoreProvider>
      );

      /*
       'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае объект с экшенами
      */
      const { result } = renderHook(() => useCounterActions(), { wrapper: ComponentWrapper });

      expect(result.current).toEqual({
        decrement: expect.any(Function),
        increment: expect.any(Function),
      });
    });
  });
});
