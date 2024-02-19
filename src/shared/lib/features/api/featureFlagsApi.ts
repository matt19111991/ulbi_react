import { rtkApi } from '@/shared/api/rtkApi';

import type { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
  /**
   * Список фич
   */
  features: Partial<FeatureFlags>;

  /**
   * ID пользователя
   */
  userId: string;
}

interface UpdateFeatureFlagsResponse {
  /**
   * Ответ от сервера
   */
  data: UpdateFeatureFlagsOptions;
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateFeatureFlags: build.mutation<UpdateFeatureFlagsOptions, UpdateFeatureFlagsOptions>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: args };
        }

        return baseQuery({
          body: args,
          method: 'PATCH',
          url: `/users/${args.userId}`,
        }) as UpdateFeatureFlagsResponse;
      },
    }),
  }),
});

export const updateFeatureFlagsMutation = featureFlagsApi.endpoints.updateFeatureFlags.initiate;

// для unit тестов
export const { useUpdateFeatureFlagsMutation } = featureFlagsApi;
