import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleView } from '@/entities/Article/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
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

const stateArticlesLoading: DeepPartial<StateSchema> = {
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

const meta = {
  title: 'pages/Article/Articles/Filters',
  component: ArticlesPageFilters,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticlesPageFilters>;

type Story = StoryObj<typeof meta>;

// Primary articles page filters old

export const PrimaryOld: Story = {
  args: {},
};

PrimaryOld.decorators = [IndentsDecorator, StoreDecorator(stateArticles)];

// Dark articles page filters old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [IndentsDecorator, StoreDecorator(stateArticles), ThemeDecorator(Theme.DARK)];

// Orange articles page filters old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticles),
  ThemeDecorator(Theme.ORANGE),
];

// Loading articles page filters old

export const LoadingOld: Story = {
  args: {},
};

LoadingOld.decorators = [IndentsDecorator, StoreDecorator(stateArticlesLoading)];

// Primary articles page filters new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticles),
];

// Dark articles page filters new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticles),
  ThemeDecorator(Theme.DARK),
];

// Orange articles page filters new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticles),
  ThemeDecorator(Theme.ORANGE),
];

// Loading articles page filters new

export const LoadingNew: Story = {
  args: {},
};

LoadingNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticlesLoading),
];

export default meta;
