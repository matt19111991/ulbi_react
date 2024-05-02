import type { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateRating } from '@/shared/lib/generators/rating';

import { useGetProfileRatingQuery, useRateProfileMutation } from './profileRatingApi';
import type { GetProfileRatingArgs, RateProfileArgs } from './profileRatingApi';

const profileRatingMock = [generateRating(4)];

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  // важен только сам 'StoreProvider', 'initialState' можно не передавать
  <StoreProvider>{children}</StoreProvider>
);

describe('profileRatingApi', () => {
  describe('useGetProfileRatingQuery', () => {
    test('returns profile rating', async () => {
      const args: GetProfileRatingArgs = {
        profileId: '1',
        userId: '1',
      };

      /*
       'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае '{ data: Rating[] }'
      */
      const { result } = renderHook(() => useGetProfileRatingQuery(args), {
        wrapper: ComponentWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(profileRatingMock);
      });
    });
  });

  describe('useRateProfileMutation', () => {
    test('returns updated profile rate', async () => {
      const args: RateProfileArgs = {
        profileId: '1',
        rate: 3,
        userId: '1',
      };

      /*
       'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае кортеж: '[mutation, { data: Rating[] }]'
      */
      const { result } = renderHook(() => useRateProfileMutation(), {
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

        expect(response.data).toEqual([{ rate: args.rate }]);
      });
    });
  });
});
