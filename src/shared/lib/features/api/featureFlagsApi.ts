import { rtkApi } from '@/shared/api/rtkApi';

import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
  features: Partial<FeatureFlags>;
  userId: string;
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
      query: ({ features, userId }) => ({
        body: { features },
        method: 'PATCH',
        url: `/users/${userId}`,
      }),
    }),
  }),
});

export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlags.initiate;
