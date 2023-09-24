import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleView } from '@/entities/Article';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { generateNormalizedArticles } from '@/shared/lib/generators/articles';

import ArticlesPage from './ArticlesPage';

const articles = generateNormalizedArticles(3);

const stateArticles: DeepPartial<StateSchema> = {
  articlesPage: {
    areLoading: false,
    ids: articles.ids,
    entities: articles.entities,
    hasMore: true,
    limit: 4,
    order: 'asc',
    page: 1,
    search: '',
    sort: ArticleSortField.CREATED,
    view: ArticleView.LIST,
  },
};

const stateArticlesLoading = {
  articlesPage: {
    areLoading: true,
    ids: [],
    entities: {},
    hasMore: true,
    limit: 4,
    page: 1,
    search: '',
    sort: ArticleSortField.CREATED,
    view: ArticleView.LIST,
  },
};

const stateArticlesError = {
  ...stateArticles,
  articlesPage: {
    ...stateArticles.articlesPage,
    error: 'Error',
  },
};

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticlesPage>;

type Story = StoryObj<typeof meta>;

// Primary articles page old

export const PrimaryOld: Story = {
  args: {},
};

PrimaryOld.decorators = [StoreDecorator(stateArticles)];

// Dark articles page old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.DARK)];

// Orange articles page old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.ORANGE)];

// Loading articles page old

export const LoadingOld: Story = {
  args: {},
};

LoadingOld.decorators = [StoreDecorator(stateArticlesLoading)];

// Primary articles page new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticles),
];

// Dark articles page new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticles),
  ThemeDecorator(Theme.DARK),
];

// Orange articles page new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticles),
  ThemeDecorator(Theme.ORANGE),
];

// Loading articles page new

export const LoadingNew: Story = {
  args: {},
};

LoadingNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticlesLoading),
];

// Error articles page

export const Error: Story = {
  args: {},
};

Error.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticlesError),
];

export default meta;
