import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default SettingsPage;'
*/

export const SettingsPageAsync = lazy(() => import('./SettingsPage'));
