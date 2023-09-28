import { FC, lazy } from 'react';

import { ArticleCreateFormProps } from './ArticleCreateForm';

export const ArticleCreateFormAsync = lazy<FC<ArticleCreateFormProps>>(
  () => import('./ArticleCreateForm'),
);
