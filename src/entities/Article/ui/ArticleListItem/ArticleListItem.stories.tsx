import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { article } from 'shared/lib/generators/articles';

import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleListItem } from './ArticleListItem';

const meta = {
  title: 'entities/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleListItem>;

type Story = StoryObj<typeof meta>;

// Primary article list item

export const PrimaryListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

// Dark article list item

export const DarkListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

DarkListItem.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article list item

export const OrangeListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

OrangeListItem.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article plate item

export const PrimaryPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

// Dark article plate item

export const DarkPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

DarkPlateItem.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article plate item

export const OrangePlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

OrangePlateItem.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
