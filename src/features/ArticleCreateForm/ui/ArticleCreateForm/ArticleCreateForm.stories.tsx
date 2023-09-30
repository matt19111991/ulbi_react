import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleCreateForm from './ArticleCreateForm';

const meta = {
  title: 'features/Article/ArticleCreateForm',
  component: ArticleCreateForm,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleCreateForm>;

type Story = StoryObj<typeof meta>;

// Primary create article form

export const Primary: Story = {
  args: {},
};

// Dark create article form

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange create article form

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
