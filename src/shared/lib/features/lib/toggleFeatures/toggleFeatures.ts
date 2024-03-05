import type { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../setGetFeatures/setGetFeatures';

interface ToggleFeaturesOptions<T> {
  /**
   * Название фичи
   */
  name: keyof FeatureFlags;

  /**
   * Колбэк, который возвращает значение, если 'feature flag' включен
   */
  on: () => T;

  /**
   * Колбэк, который возвращает значение, если 'feature flag' выключен
   */
  off: () => T;
}

// для стандартизации переключения и возможности авто удаления 'feature flags' (для функций)
export const toggleFeatures = <T>({ name, on, off }: ToggleFeaturesOptions<T>): T => {
  if (getFeatureFlag(name)) {
    return on();
  }

  return off();
};
