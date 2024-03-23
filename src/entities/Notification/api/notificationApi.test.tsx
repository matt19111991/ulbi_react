import type { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateNotifications } from '@/shared/lib/generators/notifications';

import { useGetNotificationsQuery } from './notificationApi';

const notificationsMock = generateNotifications(4);

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  // важен только сам 'StoreProvider', 'initialState' можно не передавать
  <StoreProvider>{children}</StoreProvider>
);

describe('notificationApi', () => {
  describe('useGetNotificationsQuery', () => {
    test('returns notifications', async () => {
      /*
        'renderHook()' принимает аргументами:
         1. колбэк, в котором вызываем хук,
            нужно передать 'undefined' первым аргументом, чтобы при использовании хука в компонентах
            можно было прокинуть второй аргумент с опциями
         2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
            тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае '{ data: Notification[] }'
      */
      const { result } = renderHook(() => useGetNotificationsQuery(undefined), {
        wrapper: ComponentWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(notificationsMock);
      });
    });
  });
});
