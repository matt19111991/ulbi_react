import { lazy, Suspense } from 'react';

import type { ArticleRatingProps } from './ArticleRating';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
  <Suspense fallback=''>
    <ArticleRatingLazy {...props} />
  </Suspense>
);
