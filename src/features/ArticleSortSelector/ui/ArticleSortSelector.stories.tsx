import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ArticleSortField } from '@/entities/Article/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleSortSelector } from './ArticleSortSelector';

const meta = {
  title: 'features/Article/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleSortSelector>;

type Story = StoryObj<typeof meta>;

// Primary article sort selector old

export const PrimaryOld: Story = {
  args: {
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
  },
};

PrimaryOld.decorators = [IndentsDecorator];

// Dark article sort selector old

export const DarkOld: Story = {
  args: {
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
  },
};

DarkOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article sort selector old

export const OrangeOld: Story = {
  args: {
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
  },
};

OrangeOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary article sort selector new

export const PrimaryNew: Story = {
  args: {
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
    order: 'asc',
    sort: ArticleSortField.CREATED,
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article sort selector new

export const DarkNew: Story = {
  args: {
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
    order: 'asc',
    sort: ArticleSortField.CREATED,
  },
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article sort selector new

export const OrangeNew: Story = {
  args: {
    onChangeOrder: action('onChangeOrder'),
    onChangeSort: action('onChangeSort'),
    order: 'asc',
    sort: ArticleSortField.CREATED,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
