import type { EntityState } from '@reduxjs/toolkit';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import type { Article } from '@/entities/Article';

import type { SortOrder } from '@/shared/types/sort';

/*
 'EntityState' добавляет поля 'ids' и 'entities' к 'ArticlesPageSchema'

  export interface EntityState<T, I> {
    ids: I[]
    entities: Record<I, T>
  }
*/

export interface ArticlesPageSchema extends EntityState<Article, Article['id']> {
  /*
    загрузили список статей => перешли на конкретную статью => вернулись обратно к списку =>
    снова началась подгрузка (а должен отобразиться предыдущий загруженный список)
    для того, чтобы отследить этот момент и прекратить ненужную подгрузку, заводим флаг 'inited'
  */
  inited: boolean;

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
