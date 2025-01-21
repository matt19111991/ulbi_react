import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default OutletPage;'
*/

export const OutletPageAsync = lazy(() => import('./OutletPage'));
