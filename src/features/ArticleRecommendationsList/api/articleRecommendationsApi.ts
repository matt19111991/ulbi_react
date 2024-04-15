import type { Article } from '@/entities/Article';

import { rtkApi } from '@/shared/api/rtkApi';

import { generateArticles } from '@/shared/lib/generators/articles';

type LimitArg = number;

interface RecommendationsResponse {
  data: Article[];
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    /*
     'build.query'    - для 'GET' запросов
     'build.mutation' - для 'POST', 'PUT', 'DELETE', ... запросов

      название эндпоинта                    'ReturnType'   'args'
              v                                   v          v
    */
    getArticleRecommendationsList: build.query<Article[], LimitArg>({
      queryFn: (limit, api, extraOptions, baseQuery) => {
        if (__PROJECT__ !== 'front-end') {
          return { data: generateArticles(4) };
        }

        return baseQuery({
          params: {
            _expand: 'user', // получаем весь 'user' объект из БД
            _limit: limit,
          },
          url: 'articles',
        }) as RecommendationsResponse;
      },
    }),
  }),
});

export const { useGetArticleRecommendationsListQuery } = recommendationsApi;
