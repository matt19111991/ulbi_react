import type { Article } from '@/entities/Article';
import type { Rating } from '@/entities/Rating';
import type { User } from '@/entities/User';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateArticleRating } from '@/shared/lib/generators/rating';

import type { ArticleRatingEntity } from '../model/types/articleRatingEntity';

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

interface GetArticleRatingResponse {
  data: ArticleRatingEntity[];
}

interface RateArticleResponse {
  data: ArticleRatingEntity;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<ArticleRatingEntity[], GetArticleRatingArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: [generateArticleRating(4)] };
        }

        return baseQuery({
          params: args,
          url: 'article-ratings',
        }) as GetArticleRatingResponse;
      },
    }),
    rateArticle: build.mutation<ArticleRatingEntity, RateArticleArgs>({
      queryFn: (args, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: generateArticleRating(args.rate) };
        }

        return baseQuery({
          body: args,
          method: 'POST',
          url: 'article-ratings',
        }) as RateArticleResponse;
      },
    }),
  }),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } = articleRatingApi;
