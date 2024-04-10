import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { generateArticles } from '@/shared/lib/generators/articles';

import { customViewports } from '../../../../../config/storybook/preview';

import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleList } from './ArticleList';

const meta = {
  title: 'entities/Article/ArticleList/new',
  component: ArticleList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'lg',
      viewports: customViewports,
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
    target: '_self',
  },
};

PrimaryList.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article list

export const DarkList: Story = {
  args: {
    articles: generateArticles(3),
    isLoading: false,
    view: ArticleView.LIST,
    target: '_self',
  },
};

DarkList.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article list

export const OrangeList: Story = {
  args: {
    articles: generateArticles(3),
    isLoading: false,
    view: ArticleView.LIST,
    target: '_self',
  },
};

OrangeList.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary article plates

export const PrimaryPlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    target: '_self',
    view: ArticleView.PLATE,
  },
};

PrimaryPlates.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article plates

export const DarkPlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    target: '_self',
    view: ArticleView.PLATE,
  },
};

DarkPlates.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article plates

export const OrangePlates: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    target: '_self',
    view: ArticleView.PLATE,
  },
};

OrangePlates.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Horizontally scrollable articles

export const HorizontallyScrollable: Story = {
  args: {
    articles: generateArticles(12),
    isLoading: false,
    view: ArticleView.PLATE,
    virtualized: false,
  },
};

HorizontallyScrollable.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Loading article list

export const LoadingList: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.LIST,
  },
};

LoadingList.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Loading article plates

export const LoadingPlates: Story = {
  args: {
    articles: [],
    isLoading: true,
    view: ArticleView.PLATE,
  },
};

LoadingPlates.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Empty article list

export const Empty: Story = {
  args: {
    articles: [],
    isLoading: false,
  },
};

Empty.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
