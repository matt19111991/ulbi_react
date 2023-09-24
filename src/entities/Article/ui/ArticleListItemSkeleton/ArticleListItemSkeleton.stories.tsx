import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

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

// Primary article list item skeleton old

export const PrimaryListItemSkeletonOld: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

// Dark article list item skeleton old

export const DarkListItemSkeletonOld: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

DarkListItemSkeletonOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article list item skeleton old

export const OrangeListItemSkeletonOld: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

OrangeListItemSkeletonOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article plate item skeleton old

export const PrimaryPlateItemSkeletonOld: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

// Dark article plate item skeleton old

export const DarkPlateItemSkeletonOld: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

DarkPlateItemSkeletonOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article plate item skeleton old

export const OrangePlateItemSkeletonOld: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

OrangePlateItemSkeletonOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article list item skeleton new

export const PrimaryListItemSkeletonNew: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

PrimaryListItemSkeletonNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article list item skeleton new

export const DarkListItemSkeletonNew: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

DarkListItemSkeletonNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Orange article list item skeleton new

export const OrangeListItemSkeletonNew: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

OrangeListItemSkeletonNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Primary article plate item skeleton new

export const PrimaryPlateItemSkeletonNew: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

PrimaryPlateItemSkeletonNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article plate item skeleton new

export const DarkPlateItemSkeletonNew: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

DarkPlateItemSkeletonNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Orange article plate item skeleton new

export const OrangePlateItemSkeletonNew: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

OrangePlateItemSkeletonNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
