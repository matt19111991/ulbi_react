import { ReactElement } from 'react';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../../lib/setGetFeatures';

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

// для стандартизации переключения и возможности авто удаления 'feature flags' (для компонентов)
export const ToggleFeatures = ({ feature, on, off }: ToggleFeaturesProps) => {
  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
};
