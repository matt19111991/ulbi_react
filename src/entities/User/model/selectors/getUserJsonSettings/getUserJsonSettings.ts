import { buildSelector } from '@/shared/lib/store';

import { JsonSettings } from '../../types/jsonSettings';

// выносим за пределы селектора, чтобы константа не менялась
const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
  (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
);
