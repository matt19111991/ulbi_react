import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleView } from '@/entities/Article/testing';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { generateNormalizedArticles } from '@/shared/lib/generators/articles';

import { articlesPageReducer } from '../../../../model/slice/articlesPageSlice';

import { ArticlesPageFilters } from './ArticlesPageFilters';

const articles = generateNormalizedArticles(3);

const asyncReducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

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
  title: 'pages/Article/Articles/components/old/ArticlesPageFilters',
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

Primary.decorators = [IndentsDecorator, StoreDecorator(stateArticles, asyncReducers)];

// Dark articles page filters

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticles, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange articles page filters

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticles, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Loading articles page filters

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

export const Loading: Story = {
  args: {},
};

Loading.decorators = [IndentsDecorator, StoreDecorator(stateArticlesLoading, asyncReducers)];

export default meta;
