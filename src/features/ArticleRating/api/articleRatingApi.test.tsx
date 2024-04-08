import type { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateRating } from '@/shared/lib/generators/rating';

import { useGetArticleRatingQuery, useRateArticleMutation } from './articleRatingApi';
import type { GetArticleRatingArgs, RateArticleArgs } from './articleRatingApi';

const articleRatingMock = [generateRating(4)];

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  // важен только сам 'StoreProvider', 'initialState' можно не передавать
  <StoreProvider>{children}</StoreProvider>
);

describe('articleRatingApi', () => {
  describe('useGetArticleRatingQuery', () => {
    test('returns article rating', async () => {
      const getArticleRatingArgs: GetArticleRatingArgs = {
        articleId: '1',
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
      const { result } = renderHook(() => useGetArticleRatingQuery(getArticleRatingArgs), {
        wrapper: ComponentWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(articleRatingMock);
      });
    });
  });

  describe('useRateArticleMutation', () => {
    test('returns updated article rate', async () => {
      const rateArticleArgs: RateArticleArgs = {
        articleId: '1',
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
      const { result } = renderHook(() => useRateArticleMutation(), {
        wrapper: ComponentWrapper,
      });

      /*
        основная цель 'act()' - гарантировать корректную последовательность обновлений в 'React'
        при работе с сайд-эффектами и действиями пользователя
      */
      act(() => {
        const [mutation] = result.current;

        mutation(rateArticleArgs);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual([{ rate: rateArticleArgs.rate }]);
      });
    });
  });
});
