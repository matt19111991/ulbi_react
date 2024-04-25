import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleView } from '@/entities/Article/testing';
import { userReducer } from '@/entities/User/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { generateNormalizedArticles } from '@/shared/lib/generators/articles';

import { articlesPageReducer } from '../../model/slice/articlesPageSlice';

import ArticlesPage from './ArticlesPage';

const articles = generateNormalizedArticles(3);

const asyncReducers: ReducersList = {
  articlesPage: articlesPageReducer,
  user: userReducer,
};

const stateArticles: DeepPartial<StateSchema> = {
  articlesPage: {
    areLoading: false,
    entities: articles.entities,
    hasMore: true,
    ids: articles.ids,
    limit: 4,
    order: 'asc',
    page: 1,
    search: '',
    sort: ArticleSortField.CREATED,
    view: ArticleView.LIST,
  },
  user: {
    authData: {
      jsonSettings: {
        isArticlesPageHasBeenOpened: false,
      },
    },
  },
};

const meta = {
  title: 'pages/Article/Articles/ArticlesPage/new',
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

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticles, asyncReducers),
];

// Dark articles page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticles, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange articles page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticles, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Loading articles page

const stateArticlesLoading = {
  articlesPage: {
    areLoading: true,
    entities: {},
    hasMore: true,
    ids: [],
    limit: 4,
    page: 1,
    search: '',
    sort: ArticleSortField.CREATED,
    view: ArticleView.LIST,
  },
  user: {
    authData: {
      jsonSettings: {
        isArticlesPageHasBeenOpened: true,
      },
    },
  },
};

export const Loading: Story = {
  args: {},
};

Loading.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticlesLoading, asyncReducers),
];

// Error articles page

const stateArticlesError = {
  articlesPage: {
    error: 'Error',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticlesError, asyncReducers),
];

export default meta;
