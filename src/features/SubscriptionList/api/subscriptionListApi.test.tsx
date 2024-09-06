import type { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateSubscriptions } from '@/shared/lib/generators/subscriptions';

import {
  type UnsubscribeArgs,
  useLazyGetSubscriptionListQuery,
  useRemoveSubscriptionMutation,
} from './subscriptionListApi';

const subscriptionsMock = generateSubscriptions(4);

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  // важен только сам 'StoreProvider', 'initialState' можно не передавать
  <StoreProvider>{children}</StoreProvider>
);

describe('subscriptionListApi', () => {
  describe('useLazyGetSubscriptionListQuery', () => {
    test('returns subscriptions', async () => {
      /*
       'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае кортеж: '[query, { data: Subscription[] }]'
      */
      const { result } = renderHook(() => useLazyGetSubscriptionListQuery(), {
        wrapper: ComponentWrapper,
      });

      /*
        основная цель 'act()' - гарантировать корректную последовательность обновлений в 'React'
        при работе с сайд-эффектами и действиями пользователя
      */
      act(() => {
        const [query] = result.current;

        query(undefined);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual(subscriptionsMock);
      });
    });
  });

  describe('useRemoveSubscriptionMutation', () => {
    test('returns unsubscribe message', async () => {
      const args: UnsubscribeArgs = {
        token: '1',
        userAgent: `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko)`,
      };

      /*
       'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае кортеж: '[mutation, { data: { message: string; } }]'
      */
      const { result } = renderHook(() => useRemoveSubscriptionMutation(undefined), {
        wrapper: ComponentWrapper,
      });

      /*
        основная цель 'act()' - гарантировать корректную последовательность обновлений в 'React'
        при работе с сайд-эффектами и действиями пользователя
      */
      act(() => {
        const [mutation] = result.current;

        mutation(args);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual({ message: 'Unsubscribed successfully' });
      });
    });
  });
});
