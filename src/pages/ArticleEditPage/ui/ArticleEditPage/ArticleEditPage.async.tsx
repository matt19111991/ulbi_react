import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default ArticleEditPage;'
*/

export const ArticleEditPageAsync = lazy(() => import('./ArticleEditPage'));
