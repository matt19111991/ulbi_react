import { Article } from '@/entities/Article';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateArticles } from '@/shared/lib/generators/articles';

interface RecommendationsResponse {
  data: Article[];
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /*
      build.query    - для GET запросов
      build.mutation - для POST, PUT, DELETE, ... запросов

      название эндпоинта                     ReturnType   args
              v                                   v         v
    */
    getArticleRecommendationsList: build.query<Article[], number>({
      queryFn: (limit, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: generateArticles(4) };
        }

        return baseQuery({
          params: {
            _expand: 'user',
            _limit: limit,
          },
          url: '/articles',
        }) as RecommendationsResponse;
      },
    }),
  }),
});

export const { useGetArticleRecommendationsListQuery } = recommendationsApi;
