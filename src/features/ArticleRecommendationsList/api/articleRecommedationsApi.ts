import { Article, ArticleBlockType, ArticleType } from 'entities/Article';

import { rtkApi } from 'shared/api/rtkApi';

import UserAvatar from 'shared/assets/tests/storybook.jpg';

interface RecommendationsResponse {
  data: Article[];
}
const article: Article = {
  id: '1',
  blocks: [
    {
      id: '1',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах.',
        'Существуют и другие способы запуска JS-кода в браузере.',
      ],
      title: 'Заголовок этого блока',
      type: ArticleBlockType.TEXT,
    },
    {
      id: '2',
      // eslint-disable-next-line max-len
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
      type: ArticleBlockType.IMAGE,
    },
    {
      id: '3',
      // eslint-disable-next-line max-len
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
      type: ArticleBlockType.CODE,
    },
  ],
  createdAt: '26.02.2023',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  subtitle: 'Что нового в JS за 2023 год?',
  title: 'Javascript news',
  type: [ArticleType.IT],
  user: {
    avatar: UserAvatar,
    id: '1',
    username: 'Jack',
  },
  views: 1022,
};

const generateArticles = (amount: number): Article[] => new Array(amount)
  .fill(amount)
  .map((_, idx) => ({ ...article, id: String(idx + 1) }));

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
/*  build.query    - для GET запросов
    build.mutation - для POST, PUT, DELETE, ... запросов
*/  getArticleRecommendationsList: build.query({ // 'getArticleRecommendationsList' - название эндпоинта
      queryFn: (limit, api, extraOptions, baseQuery) => {
        if (__PROJECT__ === 'storybook') {
          return { data: generateArticles(4) };
        }

        return baseQuery({
          params: {
              _limit: limit,
            },
          url: '/articles',
        }) as RecommendationsResponse;
      },
    }),
  }),
});

export const { useGetArticleRecommendationsListQuery } = recommendationsApi;
