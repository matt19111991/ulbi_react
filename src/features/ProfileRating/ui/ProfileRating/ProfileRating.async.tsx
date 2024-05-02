import { lazy, Suspense } from 'react';

import type { ProfileRatingProps } from './ProfileRating';

const ProfileRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props: ProfileRatingProps) => (
  <Suspense fallback=''>
    <ProfileRatingLazy {...props} />
  </Suspense>
);
