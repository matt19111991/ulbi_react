import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default ProfilePage;'
*/

export const ProfilePageAsync = lazy(() => import('./ProfilePage'));
