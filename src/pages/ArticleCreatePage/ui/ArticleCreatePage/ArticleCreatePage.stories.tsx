import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import ArticleCreatePage from './ArticleCreatePage';

const meta = {
  title: 'pages/ArticleCreatePage',
  component: ArticleCreatePage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleCreatePage>;

type Story = StoryObj<typeof meta>;

// Primary article create page

export const PrimaryCreate: Story = {
  args: {},
};

// Dark article create page

export const DarkCreate: Story = {
  args: {},
};

DarkCreate.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article create page

export const OrangeCreate: Story = {
  args: {},
};

OrangeCreate.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
