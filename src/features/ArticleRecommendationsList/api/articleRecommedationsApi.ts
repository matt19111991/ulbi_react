import { rtkApi } from 'shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
/*  build.query    - для GET запросов
    build.mutation - для POST, PUT, DELETE, ... запросов
*/  getArticleRecommendationsList: build.query({ // 'getArticleRecommendationsList' - название эндпоинта
      query: (limit) => ({
        params: {
          _limit: limit,
        },
        url: '/articles',
      }),
    }),
  }),
});

export const { useGetArticleRecommendationsListQuery } = recommendationsApi;
