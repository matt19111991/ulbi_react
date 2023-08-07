import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';

const meta = {
  title: 'entities/ArticleListItemSkeleton',
  component: ArticleListItemSkeleton,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleListItemSkeleton>;

type Story = StoryObj<typeof meta>;

// Primary article list item skeleton

export const PrimaryListItemSkeleton: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

// Dark article list item skeleton

export const DarkListItemSkeleton: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

DarkListItemSkeleton.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article list item skeleton

export const OrangeListItemSkeleton: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

OrangeListItemSkeleton.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article plate item skeleton

export const PrimaryPlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

// Dark article plate item skeleton

export const DarkPlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

DarkPlateItemSkeleton.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article plate item skeleton

export const OrangePlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

OrangePlateItemSkeleton.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
