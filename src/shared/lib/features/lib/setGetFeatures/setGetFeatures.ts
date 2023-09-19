import { FeatureFlags } from '@/shared/types/featureFlags';

// features не меняются в ходе сессии, их необязательно делать реактивными

let featureFlags: FeatureFlags = {};

export const getAllFeatureFlags = () => featureFlags;

export const getFeatureFlag = (flag: keyof FeatureFlags) => featureFlags?.[flag];

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};
