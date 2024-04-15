import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta = {
  title: 'features/Article/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleRecommendationsList>;

type Story = StoryObj<typeof meta>;

// Primary article recommendations list old

export const PrimaryOld: Story = {
  args: {},
};

PrimaryOld.decorators = [IndentsDecorator];

// Dark article recommendations list old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article recommendations list old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Error article recommendations list old

export const ErrorOld: Story = {
  args: {
    storybookError: 'error',
  },
};

ErrorOld.decorators = [IndentsDecorator];

// Primary article recommendations list new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article recommendations list new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article recommendations list new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Error article recommendations list new

export const ErrorNew: Story = {
  args: {
    storybookError: 'error',
  },
};

ErrorNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
