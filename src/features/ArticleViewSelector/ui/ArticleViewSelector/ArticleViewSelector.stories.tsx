import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';

import { ArticleView } from '@/entities/Article';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleViewSelector } from './ArticleViewSelector';

const meta = {
  title: 'features/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleViewSelector>;

type Story = StoryObj<typeof meta>;

// Primary article view selector

export const Primary: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

// Dark article view selector

export const Dark: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article view selector

export const Orange: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
