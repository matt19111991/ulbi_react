import { buildSelector } from '@/shared/lib/store';

import type { JsonSettings } from '../../types/jsonSettings';

type Arguments = never; // 'useJsonSettings()' не принимает аргументов

// выносим за пределы селектора, чтобы константа не менялась
const defaultJsonSettings: JsonSettings = {};

// передаем типы для большей ясности (будет работать и без этого)
export const [useJsonSettings, getJsonSettings] = buildSelector<JsonSettings, Arguments>(
  (state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings,
);
