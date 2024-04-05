import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleCreatePage from './ArticleCreatePage';

const meta = {
  title: 'pages/Article/ArticleCreatePage/old',
  component: ArticleCreatePage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleCreatePage>;

type Story = StoryObj<typeof meta>;

// Primary article create page old

export const PrimaryOld: Story = {
  args: {},
};

// Dark article create page old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article create page old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
