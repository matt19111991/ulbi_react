import { FC, lazy } from 'react';

import { ArticleEditFormProps } from './ArticleEditForm';

export const ArticleEditFormAsync = lazy<FC<ArticleEditFormProps>>(
  () => import('./ArticleEditForm'),
);
