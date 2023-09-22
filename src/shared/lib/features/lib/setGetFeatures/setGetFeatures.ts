import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import { FeatureFlags } from '@/shared/types/featureFlags';

// features не меняются в ходе сессии, их необязательно делать реактивными

const defaultFeatures: FeatureFlags = {
  isAppRedesigned: localStorage.getItem(LAST_DESIGN_LOCALSTORAGE_KEY) === 'new',
};

let featureFlags: FeatureFlags = { ...defaultFeatures };

export const getAllFeatureFlags = () => featureFlags;

export const getFeatureFlag = (flag: keyof FeatureFlags) => featureFlags?.[flag];

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};
