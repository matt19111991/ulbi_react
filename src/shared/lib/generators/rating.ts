import { Rating } from '@/entities/Rating';

/**
 * Генератор рейтинга
 * @param rate - количество необходимых звезд
 */
export const generateRating = (rate: number): Rating => ({ rate });
