import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
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

// Primary article filled rating old

export const PrimaryFilledOld: Story = {
  args: {
    articleId: '1',
  },
};

PrimaryFilledOld.decorators = [IndentsDecorator, StoreDecorator(stateArticleRating)];

// Dark article filled rating old

export const DarkFilledOld: Story = {
  args: {
    articleId: '1',
  },
};

DarkFilledOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.DARK),
];

// Orange article filled rating old

export const OrangeFilledOld: Story = {
  args: {
    articleId: '1',
  },
};

OrangeFilledOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.ORANGE),
];

// Loading article rating old

export const LoadingOld: Story = {
  args: {
    articleId: '1',
    storybookLoading: true,
  },
};

LoadingOld.decorators = [IndentsDecorator, StoreDecorator(stateArticleRating)];

// Primary article empty rating old

export const PrimaryEmptyOld: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

PrimaryEmptyOld.decorators = [IndentsDecorator, StoreDecorator(stateArticleRating)];

// Dark article empty rating old

export const DarkEmptyOld: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

DarkEmptyOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.DARK),
];

// Orange article empty rating old

export const OrangeEmptyOld: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

OrangeEmptyOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.ORANGE),
];

// Primary article filled rating new

export const PrimaryFilledNew: Story = {
  args: {
    articleId: '1',
  },
};

PrimaryFilledNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
];

// Dark article filled rating new

export const DarkFilledNew: Story = {
  args: {
    articleId: '1',
  },
};

DarkFilledNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.DARK),
];

// Orange article filled rating new

export const OrangeFilledNew: Story = {
  args: {
    articleId: '1',
  },
};

OrangeFilledNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
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
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
];

// Primary article empty rating new

export const PrimaryEmptyNew: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

PrimaryEmptyNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
];

// Dark article empty rating new

export const DarkEmptyNew: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

DarkEmptyNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.DARK),
];

// Orange article empty rating new

export const OrangeEmptyNew: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

OrangeEmptyNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
