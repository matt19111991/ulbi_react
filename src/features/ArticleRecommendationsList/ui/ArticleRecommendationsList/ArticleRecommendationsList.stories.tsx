import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const stateArticleRecommendationsList: DeepPartial<StateSchema> = {};

const meta = {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleRecommendationsList>;

type Story = StoryObj<typeof meta>;

// Primary article recommendations list

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticleRecommendationsList)];

// Dark article recommendations list

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateArticleRecommendationsList), ThemeDecorator(Theme.DARK)];

// Orange article recommendations list

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateArticleRecommendationsList), ThemeDecorator(Theme.ORANGE)];

// Error article recommendations list

export const Error: Story = {
  args: {
    storybookError: 'error',
  },
};

Error.decorators = [StoreDecorator(stateArticleRecommendationsList)];

export default meta;
