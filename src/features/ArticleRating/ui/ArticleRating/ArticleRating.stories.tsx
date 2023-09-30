import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleRating from './ArticleRating';

const stateArticleRating: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
    },
  },
};

const meta = {
  title: 'features/Article/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleRating>;

type Story = StoryObj<typeof meta>;

// Primary article rating old

export const PrimaryOld: Story = {
  args: {
    articleId: '1',
  },
};

PrimaryOld.decorators = [StoreDecorator(stateArticleRating)];

// Dark article rating old

export const DarkOld: Story = {
  args: {
    articleId: '1',
  },
};

DarkOld.decorators = [StoreDecorator(stateArticleRating), ThemeDecorator(Theme.DARK)];

// Orange article rating old

export const OrangeOld: Story = {
  args: {
    articleId: '1',
  },
};

OrangeOld.decorators = [StoreDecorator(stateArticleRating), ThemeDecorator(Theme.ORANGE)];

// Loading article rating old

export const LoadingOld: Story = {
  args: {
    articleId: '1',
    storybookLoading: true,
  },
};

LoadingOld.decorators = [StoreDecorator(stateArticleRating)];

// Empty article rating old

export const EmptyOld: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

EmptyOld.decorators = [StoreDecorator(stateArticleRating)];

// Primary article rating new

export const PrimaryNew: Story = {
  args: {
    articleId: '1',
  },
};

PrimaryNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleRating),
];

// Dark article rating new

export const DarkNew: Story = {
  args: {
    articleId: '1',
  },
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.DARK),
];

// Orange article rating new

export const OrangeNew: Story = {
  args: {
    articleId: '1',
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.ORANGE),
];

// Loading article rating new

export const LoadingNew: Story = {
  args: {
    articleId: '1',
    storybookLoading: true,
  },
};

LoadingNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleRating),
];

// Empty article rating new

export const EmptyNew: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

EmptyNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleRating),
];

export default meta;
