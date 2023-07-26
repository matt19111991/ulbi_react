export { getArticleCommentsAreLoading } from './model/selectors/comments/comments';

export {
  getArticleRecommendationsAreLoading,
} from './model/selectors/recommendations/recommendations';

export { articleDetailsPageReducer } from './model/slices';

export { ArticleDetailsPageSchema } from './model/types';

export {
  ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
