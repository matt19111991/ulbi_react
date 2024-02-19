import { ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StoreProvider } from '@/app/providers/StoreProvider';

import type { FeatureFlags } from '@/shared/types/featureFlags';

import { useUpdateFeatureFlagsMutation } from './featureFlagsApi';

interface FeatureFlagsMockProperties {
  features: Partial<FeatureFlags>;
  userId: string;
}

const featureFlagsMock: FeatureFlagsMockProperties = {
  features: {
    isArticleRatingEnabled: true,
  },
  userId: '1',
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe('featureFlagsApi', () => {
  describe('useUpdateFeatureFlagsMutation', () => {
    test('returns updated feature flags', async () => {
      const { result } = renderHook(() => useUpdateFeatureFlagsMutation(), {
        wrapper,
      });

      act(() => {
        const [mutation] = result.current;

        mutation(featureFlagsMock);
      });

      await waitFor(() => {
        const [, response] = result.current;

        expect(response.data).toEqual(featureFlagsMock);
      });
    });
  });
});
