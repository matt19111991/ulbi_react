import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '@/app/providers/StoreProvider';

import type { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';

import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures/setGetFeatures';

export interface UpdateFeatureFlagsOptions {
  /**
   * Список новых 'feature flags'
   */
  newFeatures: Partial<FeatureFlags>;

  /**
   * 'ID' пользователя
   */
  userId: string;
}

export const updateFeatureFlags = createAsyncThunk<
  void, // на выходе
  UpdateFeatureFlagsOptions, // на входе
  ThunkConfig<string> // передаваемый тип ошибки в конфиг: 'string'
>('features/updateFeatureFlags', async ({ newFeatures, userId }, thunkApi) => {
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

    window.location.reload();

    return undefined; // аналогично, если ничего не возвращать => в состоянии 'fulfilled' не будет 'payload' поля
  } catch (e) {
    /*
      обязательно нужно возвращать ошибку, иначе состояние 'rejected' не вызовется:
      ошибочно отработает состояние 'fulfilled'
    */
    return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Unexpected error');
  }
});
