import { EntityState } from '@reduxjs/toolkit';

import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
} from 'entities/Article';

import { SortOrder } from 'shared/types/sort';

export interface ArticlesPageSchema extends EntityState<Article> {
/* загрузили список статей => перешли на конкретную статью => вернулись обратно к списку =>
   снова началась подгрузка (а должен отобразиться предыдущий загруженный список)
   для того, чтобы отследить этот момент и прекратить ненужную подгрузку, заводим флаг '_inited'
*/inited: boolean;

  areLoading: boolean;
  error?: string;
  view: ArticleView;

  // filters
  order: SortOrder;
  search: string;
  sort: ArticleSortField;
  type: ArticleType;

  // pagination

  hasMore: boolean;
  limit: number;
  page: number;
}
