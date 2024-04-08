import type { Article } from '@/entities/Article';
import type { Rating } from '@/entities/Rating';
import type { User } from '@/entities/User';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateRating } from '@/shared/lib/generators/rating';

export interface GetArticleRatingArgs {
  articleId: Article['id'];
  userId: User['id'];
}

export interface RateArticleArgs {
  articleId: Article['id'];
  feedback?: Rating['feedback'];
  rate: Rating['rate'];
  userId: User['id'];
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
          params: args,
          url: 'article-ratings',
        }) as ArticleRatingResponse;
      },
    }),
    rateArticle: build.mutation<Rating[], RateArticleArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateRating(args.rate)] };
        }

        return baseQuery({
          body: args,
          method: 'POST',
          url: 'article-ratings',
        }) as ArticleRatingResponse;
      },
    }),
  }),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } = articleRatingApi;
