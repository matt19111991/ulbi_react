import { Rating } from '@/entities/Rating';

import { rtkApi } from '@/shared/api/rtkApi';

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

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: ((build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArgs>({
      query: ({ articleId, userId }) => ({
        url: 'article-ratings',
        params: { articleId, userId },
      }),
    }),
    rateArticle: build.mutation<void, RateArticleArgs>({
      query: (args) => ({
        url: 'article-ratings',
        method: 'POST',
        body: args,
      }),
    }),
  })),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } = articleRatingApi;
