import type { EntityState } from '@reduxjs/toolkit';

import type { Comment } from '@/entities/Comment';

/*
  'EntityState' добавляет поля 'ids' и 'entities' к 'ArticleDetailsCommentsSchema'

   export interface EntityState<T, I> {
     ids: I[]
     entities: Record<I, T>
   }
*/

export interface ArticleDetailsCommentsSchema extends EntityState<Comment, Comment['id']> {
  areLoading?: boolean;
  error?: string;
}
