import type { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateArticles } from '@/shared/lib/generators/articles';

import { useGetArticleRecommendationsListQuery } from './articleRecommendationsApi';

const recommendationsMock = generateArticles(4);

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  // важен только сам 'StoreProvider', 'initialState' можно не передавать
  <StoreProvider>{children}</StoreProvider>
);

describe('articleRecommendationsApi', () => {
  describe('useGetArticleRecommendationsListQuery', () => {
    test('returns recommendations', async () => {
      /*
       'renderHook()' принимает аргументами:
          1. колбэк, в котором вызываем хук
          2. объект с опциями, в который под ключом 'wrapper' можно прокинуть компонент-обертку для
             тестируемого компонента

       'renderHook()' возвращает поле 'result', в котором содержится поле 'current' - это
        значение, возвращаемое из хука, в нашем случае '{ data: Article[] }'
      */
      const { result } = renderHook(() => useGetArticleRecommendationsListQuery(4), {
        wrapper: ComponentWrapper,
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(recommendationsMock);
      });
    });
  });
});
