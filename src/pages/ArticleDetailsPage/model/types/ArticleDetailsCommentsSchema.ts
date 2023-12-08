import { EntityState } from '@reduxjs/toolkit';

import { Comment } from '@/entities/Comment';

/* 'EntityState' добавляет поля 'ids' и 'entities' к 'ArticleDetailsCommentsSchema'

   export interface EntityState<T, I> {
     ids: I[]
     entities: Dictionary<T>
   }
*/

export interface ArticleDetailsCommentsSchema extends EntityState<Comment, Comment['id']> {
  areLoading?: boolean;
  error?: string;
}
