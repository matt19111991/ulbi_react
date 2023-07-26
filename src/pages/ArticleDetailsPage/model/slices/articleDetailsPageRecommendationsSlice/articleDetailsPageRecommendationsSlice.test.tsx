import { Article, ArticleType } from 'entities/Article';

import { fetchArticleRecommendations } from '../../services/fetchArticleRecommendations/fetchArticleRecommendations';

import { ArticleDetailsRecommendationsSchema } from '../../types/ArticleDetailsRecommendationsSchema';

import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

const articles: Article[] = [
  {
    id: '1',
    blocks: [],
    createdAt: '26.02.2023',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    subtitle: 'Что нового в JS за 2023 год?',
    title: 'Javascript news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 1022,
  },
  {
    id: '2',
    blocks: [],
    createdAt: '19.01.2023',
    img: 'https://w7.pngwing.com/pngs/234/329/png-transparent-python-logo-thumbnail.png',
    subtitle: 'Что нового у Python за 2023 год?',
    title: 'Python news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 845,
  },
  {
    id: '3',
    blocks: [],
    createdAt: '11.02.2023',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    subtitle: 'Что нового в JS за 2023 год?',
    title: 'Javascript news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 446,
  },
  {
    id: '4',
    blocks: [],
    createdAt: '29.02.2023',
    img: 'https://w7.pngwing.com/pngs/234/329/png-transparent-python-logo-thumbnail.png',
    subtitle: 'Что нового у Python за 2023 год?',
    title: 'Python news',
    type: [ArticleType.IT],
    user: {
      id: '1',
      username: 'Jack',
    },
    views: 132,
  },
];

const normalizedEntities = {
  1: articles.at(0),
  2: articles.at(1),
  3: articles.at(2),
  4: articles.at(3),
};

const normalizedIds = ['1', '2', '3', '4'];

describe('articleDetailsPageRecommendationsSlice', () => {
  test('test fetch article recommendations pending', () => {
    const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
      areLoading: false,
      error: 'Error',
    };

    expect(
      articleDetailsPageRecommendationsReducer(
        state as ArticleDetailsRecommendationsSchema,
        fetchArticleRecommendations.pending,
      ),
    ).toEqual({ areLoading: true, error: undefined });
  });

  test('test fetch article recommendations fulfilled', () => {
    const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
      areLoading: true,
    };

    expect(
      articleDetailsPageRecommendationsReducer(
        state as ArticleDetailsRecommendationsSchema,
        fetchArticleRecommendations.fulfilled(articles, ''),
      ),
    ).toEqual({
      areLoading: false,
      entities: normalizedEntities,
      ids: normalizedIds,
    });
  });
});
