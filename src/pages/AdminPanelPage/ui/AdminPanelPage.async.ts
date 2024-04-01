import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default AdminPanelPage;'
*/

export const AdminPanelPageAsync = lazy(() => import('./AdminPanelPage'));
