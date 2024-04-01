export { getArticleCommentsAreLoading } from './model/selectors/comments/comments';

export { getArticleRecommendationsAreLoading } from './model/selectors/recommendations/recommendations';

export { fetchArticleRecommendations } from './model/services/fetchArticleRecommendations/fetchArticleRecommendations';

export type { ArticleDetailsPageSchema } from './model/types';

// 'as' для удобства
export { ArticleDetailsPageAsync as ArticleDetailsPage } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
