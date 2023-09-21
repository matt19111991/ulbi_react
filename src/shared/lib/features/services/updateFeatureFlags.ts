import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';

import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures/setGetFeatures';

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
    const allFeatures = {
      ...getAllFeatureFlags(),
      ...newFeatures,
    };

    await thunkApi.dispatch(
      updateFeatureFlagsMutation({
        features: allFeatures,
        userId,
      }),
    );

    setFeatureFlags(allFeatures);

    return undefined;
  } catch (e) {
    return thunkApi.rejectWithValue('error');
  }
});
