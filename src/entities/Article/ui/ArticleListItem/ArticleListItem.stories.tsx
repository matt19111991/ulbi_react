import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { article } from '@/shared/lib/generators/articles';

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

// Primary article list item old

export const PrimaryListItemOld: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

// Dark article list item old

export const DarkListItemOld: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

DarkListItemOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article list item old

export const OrangeListItemOld: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

OrangeListItemOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article plate item old

export const PrimaryPlateItemOld: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

// Dark article plate item old

export const DarkPlateItemOld: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

DarkPlateItemOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article plate item old

export const OrangePlateItemOld: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

OrangePlateItemOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article list item new

export const PrimaryListItemNew: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

PrimaryListItemNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article list item new

export const DarkListItemNew: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

DarkListItemNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Orange article list item new

export const OrangeListItemNew: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

OrangeListItemNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Primary article plate item new

export const PrimaryPlateItemNew: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

PrimaryPlateItemNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article plate item new

export const DarkPlateItemNew: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

DarkPlateItemNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Orange article plate item new

export const OrangePlateItemNew: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

OrangePlateItemNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
