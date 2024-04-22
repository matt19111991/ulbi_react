import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ArticleView } from '@/entities/Article/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
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
    onViewClick: action('onViewClick'),
    selectedView: ArticleView.LIST,
  },
};

PrimaryOld.decorators = [IndentsDecorator];

// Dark article view selector old

export const DarkOld: Story = {
  args: {
    onViewClick: action('onViewClick'),
    selectedView: ArticleView.LIST,
  },
};

DarkOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article view selector old

export const OrangeOld: Story = {
  args: {
    onViewClick: action('onViewClick'),
    selectedView: ArticleView.LIST,
  },
};

OrangeOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary article view selector new

export const PrimaryNew: Story = {
  args: {
    onViewClick: action('onViewClick'),
    selectedView: ArticleView.LIST,
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article view selector new

export const DarkNew: Story = {
  args: {
    onViewClick: action('onViewClick'),
    selectedView: ArticleView.LIST,
  },
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article view selector new

export const OrangeNew: Story = {
  args: {
    onViewClick: action('onViewClick'),
    selectedView: ArticleView.LIST,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
