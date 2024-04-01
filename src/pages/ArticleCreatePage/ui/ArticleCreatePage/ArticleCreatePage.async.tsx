import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default ArticleCreatePage;'
*/

export const ArticleCreatePageAsync = lazy(() => import('./ArticleCreatePage'));
