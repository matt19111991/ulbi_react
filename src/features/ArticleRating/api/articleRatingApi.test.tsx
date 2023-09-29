import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateRating } from '@/shared/lib/generators/rating';

import { useGetArticleRatingQuery, useRateArticleMutation } from './articleRatingApi';

const articleRatingMock = [generateRating(4)];

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe('articleRatingApi', () => {
  describe('useGetArticleRatingQuery', () => {
    test('returns article rating', async () => {
      const getArticleRatingArgs = {
        articleId: '1',
        userId: '1',
      };

      const { result } = renderHook(() => useGetArticleRatingQuery(getArticleRatingArgs), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.currentData).toEqual(articleRatingMock);
      });
    });
  });

  describe('useRateArticleMutation', () => {
    test('returns updated article rate', async () => {
      const rateArticleArgs = {
        articleId: '1',
        rate: 3,
        userId: '1',
      };

      const { result } = renderHook(() => useRateArticleMutation(), {
        wrapper,
      });

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
