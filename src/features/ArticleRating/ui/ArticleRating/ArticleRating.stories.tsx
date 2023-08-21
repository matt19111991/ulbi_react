import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

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
  title: 'features/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleRating>;

type Story = StoryObj<typeof meta>;

// Primary article rating

export const Primary: Story = {
  args: {
    articleId: '1',
  },
};

Primary.decorators = [StoreDecorator(stateArticleRating)];

// Dark article rating

export const Dark: Story = {
  args: {
    articleId: '1',
  },
};

Dark.decorators = [
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.DARK),
];

// Orange article rating

export const Orange: Story = {
  args: {
    articleId: '1',
  },
};

Orange.decorators = [
  StoreDecorator(stateArticleRating),
  ThemeDecorator(Theme.ORANGE),
];

// Loading article rating

export const Loading: Story = {
  args: {
    articleId: '1',
    storybookLoading: true,
  },
};

Loading.decorators = [StoreDecorator(stateArticleRating)];

// Empty article rating

export const Empty: Story = {
  args: {
    articleId: '1',
    storybookRatingEmpty: true,
  },
};

Empty.decorators = [StoreDecorator(stateArticleRating)];

export default meta;