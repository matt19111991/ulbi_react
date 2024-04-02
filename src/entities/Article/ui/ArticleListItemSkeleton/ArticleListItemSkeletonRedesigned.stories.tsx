import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';

const PlateDecorator = (Story: StoryFn) => (
  <div style={{ backgroundColor: 'var(--bg-redesigned)', padding: 8 }}>
    <Story />
  </div>
);

const meta = {
  title: 'entities/Article/ArticleListItemSkeleton/new',
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

PrimaryListItemSkeleton.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Dark article list item skeleton

export const DarkListItemSkeleton: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

DarkListItemSkeleton.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article list item skeleton

export const OrangeListItemSkeleton: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

OrangeListItemSkeleton.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary article plate item skeleton

export const PrimaryPlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

PrimaryPlateItemSkeleton.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  PlateDecorator,
];

// Dark article plate item skeleton

export const DarkPlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

DarkPlateItemSkeleton.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  PlateDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article plate item skeleton

export const OrangePlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

OrangePlateItemSkeleton.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  PlateDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
