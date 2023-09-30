import type { Meta, StoryObj } from '@storybook/react';

import { ArticleView } from '@/entities/Article';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleViewSelector } from './ArticleViewSelector';

const meta = {
  title: 'features/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleViewSelector>;

type Story = StoryObj<typeof meta>;

// Primary article view selector old

export const PrimaryOld: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

// Dark article view selector old

export const DarkOld: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article view selector old

export const OrangeOld: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article view selector new

export const PrimaryNew: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article view selector new

export const DarkNew: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange article view selector new

export const OrangeNew: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
