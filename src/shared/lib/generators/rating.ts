import type { Rating } from '@/entities/Rating';

import type { ArticleRatingEntity } from '@/features/ArticleRating';
import type { ProfileRatingEntity } from '@/features/ProfileRating';

/**
 * Генератор рейтинга
 * @param rate - количество необходимых звезд
 */
export const generateRating = (rate: number): Rating => ({ rate });

/**
 * Генератор рейтинга для статьи
 * @param rate - количество необходимых звезд
 */
export const generateArticleRating = (rate: number): ArticleRatingEntity => ({
  articleId: '1',
  id: '1',
  rate,
  userId: '1',
});

/**
 * Генератор рейтинга для профиля
 * @param rate - количество необходимых звезд
 */
export const generateProfileRating = (rate: number): ProfileRatingEntity => ({
  id: '1',
  rate,
  profileId: '1',
  userId: '1',
});
