import { LAST_DESIGN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

import type { FeatureFlags } from '@/shared/types/featureFlags';

// 'feature flags' не меняются в ходе сессии, их необязательно делать реактивными

const defaultFeatures: FeatureFlags = {
  isAppRedesigned: localStorage.getItem(LAST_DESIGN_LOCALSTORAGE_KEY) === 'new',
};

let featureFlags: FeatureFlags = { ...defaultFeatures };

/**
 * Получение всех 'feature flags'
 */
export const getAllFeatureFlags = () => featureFlags;

/**
 * Получение 'feature flag' по ключу
 * @param flag - название фичи
 */
export const getFeatureFlag = (flag: keyof FeatureFlags) => featureFlags?.[flag];

/**
 * Установка 'feature flags'
 * @param newFeatureFlags - список новых 'feature flags'
 */
export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};
