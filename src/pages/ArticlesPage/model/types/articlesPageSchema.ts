import { EntityState } from '@reduxjs/toolkit';

import { Article, ArticleView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article>{
  areLoading: boolean;
  error?: string;
  view: ArticleView;
}
