import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { generateArticles } from '@/shared/lib/generators/articles';

import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleList } from './ArticleList';

const meta = {
  title: 'entities/Article/ArticleList/old',
  component: ArticleList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleList>;

type Story = StoryObj<typeof meta>;

// Primary article list

export const PrimaryList: Story = {
  args: {
    articles: generateArticles(3),
    isLoading: false,
    view: ArticleView.LIST,
  },
};

PrimaryList.decorators = [IndentsDecorator];

// Dark article list

export const DarkList: Story = {
  args: {
    articles: generateArticles(3),
    isLoading: false,
    view: ArticleView.LIST,
  },
};

DarkList.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article list

export const OrangeList: Story = {
  args: {
    articles: generateArticles(3),
    isLoading: false,
    view: ArticleView.LIST,
  },
};

OrangeList.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary article plates

export const PrimaryPlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
  },
};

PrimaryPlates.decorators = [IndentsDecorator];

// Dark article plates

export const DarkPlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
  },
};

DarkPlates.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article plates

export const OrangePlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
  },
};

OrangePlates.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Horizontally scrollable articles

export const HorizontallyScrollable: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
    virtualized: false,
  },
};

HorizontallyScrollable.decorators = [IndentsDecorator];

// Loading article list

export const LoadingList: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.LIST,
  },
};

LoadingList.decorators = [IndentsDecorator];

// Loading article plates

export const LoadingPlates: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.PLATE,
  },
};

LoadingPlates.decorators = [IndentsDecorator];

// Empty article list

export const Empty: Story = {
  args: {
    articles: [],
    isLoading: false,
  },
};

Empty.decorators = [IndentsDecorator];

export default meta;
