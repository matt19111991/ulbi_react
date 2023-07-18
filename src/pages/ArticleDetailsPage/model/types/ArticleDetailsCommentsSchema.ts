import { EntityState } from '@reduxjs/toolkit';

import { Comment } from 'entities/Comment';

/* 'EntityState' добавляет поля 'ids' и 'entities' к 'ArticleDetailsCommentsSchema'

   export interface EntityState<T> {
     ids: EntityId[]
     entities: Dictionary<T>
   }
*/

export interface ArticleDetailsCommentsSchema extends EntityState<Comment>{
  areLoading?: boolean;
  error?: string;
}
