import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const stateArticleRecommendationsListRedesigned: DeepPartial<StateSchema> = redesignState;

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

// Primary article recommendations list old

export const PrimaryOld: Story = {
  args: {},
};

// Dark article recommendations list old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article recommendations list old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Error article recommendations list old

export const ErrorOld: Story = {
  args: {
    storybookError: 'error',
  },
};

// Primary article recommendations list new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleRecommendationsListRedesigned),
];

// Dark article recommendations list new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleRecommendationsListRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange article recommendations list new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleRecommendationsListRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

// Error article recommendations list new

export const ErrorNew: Story = {
  args: {
    storybookError: 'error',
  },
};

export default meta;
