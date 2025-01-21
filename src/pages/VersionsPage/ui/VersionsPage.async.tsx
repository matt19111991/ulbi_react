import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default VersionsPage;'
*/

export const VersionsPageAsync = lazy(() => import('./VersionsPage'));
