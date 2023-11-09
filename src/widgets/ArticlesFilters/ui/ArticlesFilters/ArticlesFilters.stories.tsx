import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ArticleSortField, ArticleType } from '@/entities/Article/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticlesFilters } from './ArticlesFilters';

const meta = {
  title: 'widgets/Article/ArticlesFilters',
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

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

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
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
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
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
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

Loading.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
