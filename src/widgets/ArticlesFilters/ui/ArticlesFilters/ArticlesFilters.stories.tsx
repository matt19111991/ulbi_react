import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType } from '@/entities/Article';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticlesFilters } from './ArticlesFilters';

const stateArticlesFiltersRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'widgets/ArticlesFilters',
  component: ArticlesFilters,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticlesFilters>;

type Story = StoryObj<typeof meta>;

// Primary article filters

export const Primary: Story = {
  args: {
    areLoading: false,
    onChangeOrder: action('onChangeOrder'),
    onChangeSearch: action('onChangeSearch'),
    onChangeSort: action('onChangeSort'),
    onChangeType: action('onChangeType'),
    order: 'asc',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ECONOMICS,
  },
};

Primary.decorators = [RedesignDecorator, StoreDecorator(stateArticlesFiltersRedesigned)];

// Dark article filters

export const Dark: Story = {
  args: {
    areLoading: false,
    onChangeOrder: action('onChangeOrder'),
    onChangeSearch: action('onChangeSearch'),
    onChangeSort: action('onChangeSort'),
    onChangeType: action('onChangeType'),
    order: 'asc',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ECONOMICS,
  },
};

Dark.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticlesFiltersRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange article filters

export const Orange: Story = {
  args: {
    areLoading: false,
    onChangeOrder: action('onChangeOrder'),
    onChangeSearch: action('onChangeSearch'),
    onChangeSort: action('onChangeSort'),
    onChangeType: action('onChangeType'),
    order: 'asc',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ECONOMICS,
  },
};

Orange.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticlesFiltersRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

// Loading article filters

export const Loading: Story = {
  args: {
    areLoading: true,
    order: 'asc',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ECONOMICS,
  },
};

Loading.decorators = [RedesignDecorator, StoreDecorator(stateArticlesFiltersRedesigned)];

export default meta;
