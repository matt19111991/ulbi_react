import { FeatureFlags } from '@/shared/types/featureFlags';

// features не меняются в ходе сессии, их необязательно делать реактивными

let featureFlags: FeatureFlags = {};

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};

export const getFeatureFlag = (flag: keyof FeatureFlags) => featureFlags?.[flag];
