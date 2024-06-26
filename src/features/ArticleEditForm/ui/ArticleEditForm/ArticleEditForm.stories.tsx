import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleEditForm from './ArticleEditForm';

const meta = {
  title: 'features/Article/ArticleEditForm',
  component: ArticleEditForm,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleEditForm>;

type Story = StoryObj<typeof meta>;

// Primary edit article form

export const Primary: Story = {
  args: {
    articleId: '1',
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark edit article form

export const Dark: Story = {
  args: {
    articleId: '1',
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange edit article form

export const Orange: Story = {
  args: {
    articleId: '1',
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
