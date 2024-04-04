import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { article } from '@/shared/lib/generators/articles';

import { ArticleView } from '../../../model/consts/articleConsts';

import { ArticleListItemRedesigned } from './ArticleListItemRedesigned';

const meta = {
  title: 'entities/Article/ArticleListItem/new',
  component: ArticleListItemRedesigned,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleListItemRedesigned>;

type Story = StoryObj<typeof meta>;

// Primary article list item

export const PrimaryListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

PrimaryListItem.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article list item

export const DarkListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

DarkListItem.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article list item

export const OrangeListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

OrangeListItem.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary article plate item

export const PrimaryPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

PrimaryPlateItem.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark article plate item

export const DarkPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

DarkPlateItem.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange article plate item

export const OrangePlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

OrangePlateItem.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
