import type { Article } from '@/entities/Article';
import type { Rating } from '@/entities/Rating';
import type { User } from '@/entities/User';

export interface ArticleRatingEntity {
  articleId: Article['id'];
  feedback?: Rating['feedback'];
  id: string;
  rate: Rating['rate'];
  userId: User['id'];
}
