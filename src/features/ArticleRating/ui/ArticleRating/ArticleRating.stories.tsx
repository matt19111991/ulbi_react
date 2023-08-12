import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/app/providers/ThemeProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

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

export default meta;
