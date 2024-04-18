import { lazy } from 'react';

/*
  чтобы использовать ленивую загрузку, импортируемый компонент должен экспортироваться
  по умолчанию: 'export default ArticleEditForm;'
*/

export const ArticleEditFormAsync = lazy(() => import('./ArticleEditForm'));
