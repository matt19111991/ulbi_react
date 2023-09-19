import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';

import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagsOptions {
  newFeatures: Partial<FeatureFlags>;
  userId: string;
}

export const updateFeatureFlags = createAsyncThunk<
  void,
  UpdateFeatureFlagsOptions,
  ThunkConfig<string>
>('user/saveJsonSettings', async ({ newFeatures, userId }, thunkApi) => {
  try {
    await thunkApi.dispatch(
      updateFeatureFlagsMutation({
        features: {
          ...getAllFeatureFlags(),
          ...newFeatures,
        },
        userId,
      }),
    );

    window.location.reload();

    return undefined;
  } catch (e) {
    return thunkApi.rejectWithValue('error');
  }
});
