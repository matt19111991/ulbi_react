import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default ArticleCreateForm;'
*/

export const ArticleCreateFormAsync = lazy(() => import('./ArticleCreateForm'));
