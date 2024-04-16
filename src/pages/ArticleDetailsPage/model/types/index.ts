import type { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;

  /*
    при необходимости можно объединять данные для статьи (комментарии) с рекомендациями
    recommendations: RecommendationsSchema;
  */
}
