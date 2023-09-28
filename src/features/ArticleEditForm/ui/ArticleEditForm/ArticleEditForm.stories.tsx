import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleEditForm from './ArticleEditForm';

const meta = {
  title: 'features/ArticleEditForm',
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

// Dark edit article form

export const Dark: Story = {
  args: {
    articleId: '1',
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange edit article form

export const Orange: Story = {
  args: {
    articleId: '1',
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
