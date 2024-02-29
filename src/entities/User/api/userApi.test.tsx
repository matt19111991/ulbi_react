import type { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { Theme } from '@/shared/const/theme';

import { mockUser, useGetUserDataByIdQuery, useSetJsonSettingsMutation } from './userApi';
import type { SetJsonSettingsArgs } from './userApi';

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe('userApi', () => {
  describe('useGetUserDataByIdQuery', () => {
    test('returns user', async () => {
      const userId = '1';

      /*
        'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента,
             важен только сам 'StoreProvider', 'initialState' можно не передавать

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае '{ data: User }'
      */
      const { result } = renderHook(() => useGetUserDataByIdQuery(userId), {
        wrapper: ComponentWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockUser);
      });
    });
  });

  describe('useSetJsonSettingsMutation', () => {
    test('returns updated json settings', async () => {
      const jsonSettingsArgs: SetJsonSettingsArgs = {
        jsonSettings: {
          isArticlesPageHasBeenOpened: true,
          isFirstVisit: true,
          isSettingsPageHasBeenOpen: true,
          theme: Theme.ORANGE,
        },
        userId: '1',
      };

      /*
        'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента,
             важен только сам 'StoreProvider', 'initialState' можно не передавать

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае кортеж: '[mutation, { data: User }]'
      */
      const { result } = renderHook(() => useSetJsonSettingsMutation(), {
        wrapper: ComponentWrapper,
      });

      /*
        основная цель 'act()' - гарантировать корректную последовательность обновлений в 'React'
        при работе с сайд-эффектами и действиями пользователя
     */
      act(() => {
        const [mutation] = result.current;

        mutation(jsonSettingsArgs);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual({ ...mockUser, ...jsonSettingsArgs.jsonSettings });
      });
    });
  });
});
