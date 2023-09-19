import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { generateArticles } from '@/shared/lib/generators/articles';

import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleList } from './ArticleList';

const meta = {
  title: 'entities/ArticleList/old',
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

// Dark article list

export const DarkList: Story = {
  args: {
    articles: generateArticles(3),
    isLoading: false,
    view: ArticleView.LIST,
  },
};

DarkList.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article list

export const OrangeList: Story = {
  args: {
    articles: generateArticles(3),
    isLoading: false,
    view: ArticleView.LIST,
  },
};

OrangeList.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article plates

export const PrimaryPlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
    virtualized: true,
  },
};

// Dark article plates

export const DarkPlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
    virtualized: true,
  },
};

DarkPlates.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article plates

export const OrangePlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
    virtualized: true,
  },
};

OrangePlates.decorators = [ThemeDecorator(Theme.ORANGE)];

// Horizontally scrollable articles

export const HorizontallyScrollable: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
    virtualized: false,
  },
};

// Loading article list

export const LoadingList: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.LIST,
    virtualized: true,
  },
};

// Loading article plates

export const LoadingPlates: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.PLATE,
    virtualized: true,
  },
};

// Empty article list

export const Empty: Story = {
  args: {
    articles: [],
    isLoading: false,
  },
};

export default meta;
