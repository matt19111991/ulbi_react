import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { ArticleSortField, ArticleView } from 'entities/Article';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { generateNormalizedArticles } from 'shared/lib/generateArticles/generateArticles';

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

// Primary articles page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticles)];

// Dark articles page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.DARK)];

// Orange articles page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.ORANGE)];

// Loading articles page

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

export const Loading: Story = {
  args: {},
};

Loading.decorators = [StoreDecorator(stateArticlesLoading)];

// Error articles page

const stateArticlesError = {
  ...stateArticles,
  articlesPage: {
    ...stateArticles.articlesPage,
    error: 'Error',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [StoreDecorator(stateArticlesError)];

export default meta;
