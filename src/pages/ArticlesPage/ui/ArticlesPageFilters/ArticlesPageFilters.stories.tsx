import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleView } from '@/entities/Article';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { generateNormalizedArticles } from '@/shared/lib/generators/articles';

import { ArticlesPageFilters } from './ArticlesPageFilters';

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
  title: 'pages/ArticlesPage/Filters',
  component: ArticlesPageFilters,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticlesPageFilters>;

type Story = StoryObj<typeof meta>;

// Primary articles page filters

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticles)];

// Dark articles page filters

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.DARK)];

// Orange articles page filters

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.ORANGE)];

// Loading articles page filters

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

export default meta;
