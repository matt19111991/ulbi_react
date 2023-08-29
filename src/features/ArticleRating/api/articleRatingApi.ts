import { Rating } from '@/entities/Rating';

import { rtkApi } from '@/shared/api/rtkApi';
import { generateRating } from '@/shared/lib/generators/rating';

interface GetArticleRatingArgs {
  articleId: string;
  userId: string;
}

interface GetArticleRatingResponse {
  data: Rating[];
}

interface RateArticleArgs {
  articleId: string;
  feedback?: string;
  rate: number;
  userId: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArgs>({
      queryFn: ({ articleId, userId }, api, extraOptions, baseQuery) => {
        if (__PROJECT__ === 'storybook') {
          return { data: [generateRating(4)] };
        }

        return baseQuery({
          url: '/article-ratings',
          params: { articleId, userId },
        }) as GetArticleRatingResponse;
      },
    }),
    rateArticle: build.mutation<void, RateArticleArgs>({
      query: (args) => ({
        url: 'article-ratings',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } = articleRatingApi;
