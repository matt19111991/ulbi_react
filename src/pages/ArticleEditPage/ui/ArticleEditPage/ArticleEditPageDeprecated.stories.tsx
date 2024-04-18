import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleEditPage from './ArticleEditPage';

const meta = {
  title: 'pages/Article/ArticleEditPage/old',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleEditPage>;

type Story = StoryObj<typeof meta>;

// Primary article edit page

export const Primary: Story = {
  args: {
    storybookId: '1',
  },
};

// Dark article edit page

export const Dark: Story = {
  args: {
    storybookId: '1',
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article edit page

export const Orange: Story = {
  args: {
    storybookId: '1',
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
