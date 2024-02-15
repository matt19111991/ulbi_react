import { ReactElement } from 'react';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../../lib/setGetFeatures/setGetFeatures';

interface ToggleFeaturesProps {
  /**
   * Название фичи
   */
  feature: keyof FeatureFlags;

  /**
   * Элемент, если feature flag включен
   */
  on: ReactElement | null;

  /**
   * Элемент, если feature flag выключен
   */
  off: ReactElement | null;
}

// для стандартизации переключения и возможности авто удаления 'feature flags' (для компонентов)
export const ToggleFeatures = ({ feature, on, off }: ToggleFeaturesProps) => {
  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
};
