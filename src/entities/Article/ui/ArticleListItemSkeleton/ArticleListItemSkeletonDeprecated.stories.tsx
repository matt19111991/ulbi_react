import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleView } from '../../model/consts/articleConsts';

import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';

const ListDecorator = (Story: StoryFn) => (
  <div style={{ height: '100vh' }}>
    <Story />
  </div>
);

const PlateDecorator = (Story: StoryFn) => (
  <div style={{ width: '262px' }}>
    <Story />
  </div>
);

const meta = {
  title: 'entities/Article/ArticleListItemSkeleton/old',
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

PrimaryListItemSkeleton.decorators = [ListDecorator, IndentsDecorator];

// Dark article list item skeleton

export const DarkListItemSkeleton: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

DarkListItemSkeleton.decorators = [ListDecorator, IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article list item skeleton

export const OrangeListItemSkeleton: Story = {
  args: {
    view: ArticleView.LIST,
  },
};

OrangeListItemSkeleton.decorators = [ListDecorator, IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary article plate item skeleton

export const PrimaryPlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

PrimaryPlateItemSkeleton.decorators = [IndentsDecorator, PlateDecorator];

// Dark article plate item skeleton

export const DarkPlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

DarkPlateItemSkeleton.decorators = [IndentsDecorator, PlateDecorator, ThemeDecorator(Theme.DARK)];

// Orange article plate item skeleton

export const OrangePlateItemSkeleton: Story = {
  args: {
    view: ArticleView.PLATE,
  },
};

OrangePlateItemSkeleton.decorators = [
  IndentsDecorator,
  PlateDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
