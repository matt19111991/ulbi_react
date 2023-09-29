import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import { generateRating } from '@/shared/lib/generators/rating';

import { useGetProfileRatingQuery, useRateProfileMutation } from './profileRatingApi';

const profileRatingMock = [generateRating(4)];

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe('profileRatingApi', () => {
  describe('useGetProfileRatingQuery', () => {
    test('returns profile rating', async () => {
      const getProfileRatingArgs = {
        profileId: '1',
        userId: '1',
      };

      const { result } = renderHook(() => useGetProfileRatingQuery(getProfileRatingArgs), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.currentData).toEqual(profileRatingMock);
      });
    });
  });

  describe('useRateProfileMutation', () => {
    test('returns updated profile rate', async () => {
      const rateProfileArgs = {
        profileId: '1',
        rate: 3,
        userId: '1',
      };

      const { result } = renderHook(() => useRateProfileMutation(), {
        wrapper,
      });

      act(() => {
        const [mutation] = result.current;

        mutation(rateProfileArgs);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual([{ rate: rateProfileArgs.rate }]);
      });
    });
  });
});
