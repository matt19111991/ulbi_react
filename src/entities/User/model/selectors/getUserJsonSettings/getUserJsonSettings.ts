import { buildSelector } from '@/shared/lib/store';

import { JsonSettings } from '../../types/jsonSettings';

type Arguments = never; // 'useJsonSettings()' не принимает аргументов

// выносим за пределы селектора, чтобы константа не менялась
const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector<JsonSettings, Arguments>(
  (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
);
