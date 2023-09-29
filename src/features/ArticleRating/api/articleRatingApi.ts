import { Rating } from '@/entities/Rating';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateRating } from '@/shared/lib/generators/rating';

interface GetArticleRatingArgs {
  articleId: string;
  userId: string;
}

interface RateArticleArgs {
  articleId: string;
  feedback?: string;
  rate: number;
  userId: string;
}

interface ArticleRatingResponse {
  data: Rating[];
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateRating(4)] };
        }

        return baseQuery({
          url: '/article-ratings',
          params: args,
        }) as ArticleRatingResponse;
      },
    }),
    rateArticle: build.mutation<Rating[], RateArticleArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateRating(args.rate)] };
        }

        return baseQuery({
          url: 'article-ratings',
          method: 'POST',
          body: args,
        }) as ArticleRatingResponse;
      },
    }),
  }),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } = articleRatingApi;
