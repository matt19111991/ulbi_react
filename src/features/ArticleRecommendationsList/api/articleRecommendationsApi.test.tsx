import { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateArticles } from '@/shared/lib/generators/articles';

import { useGetArticleRecommendationsListQuery } from './articleRecommendationsApi';

const recommendationsMock = generateArticles(4);

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe('articleRecommendationsApi', () => {
  describe('useGetArticleRecommendationsListQuery', () => {
    test('returns recommendations', async () => {
      const { result } = renderHook(() => useGetArticleRecommendationsListQuery(4), { wrapper });

      await waitFor(() => {
        expect(result.current.currentData).toEqual(recommendationsMock);
      });
    });
  });
});
