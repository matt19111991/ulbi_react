import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../setGetFeatures/setGetFeatures';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

// для стандартизации переключения и возможности авто удаления 'feature flags' (для функций)
export const toggleFeatures = <T>({ name, on, off }: ToggleFeaturesOptions<T>): T => {
  if (getFeatureFlag(name)) {
    return on();
  }

  return off();
};
