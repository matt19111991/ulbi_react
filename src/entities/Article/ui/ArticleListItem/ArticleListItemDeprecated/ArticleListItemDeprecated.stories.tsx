import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { article } from '@/shared/lib/generators/articles';

import { ArticleView } from '../../../model/consts/articleConsts';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated';

const PlateDecorator = (Story: ReturnType<StoryFn>) => (
  <div style={{ width: '262px' }}>
    <Story />
  </div>
);

const meta = {
  title: 'entities/Article/ArticleListItem/old',
  component: ArticleListItemDeprecated,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleListItemDeprecated>;

type Story = StoryObj<typeof meta>;

// Primary article list item

export const PrimaryListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

PrimaryListItem.decorators = [IndentsDecorator];

// Dark article list item

export const DarkListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

DarkListItem.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article list item

export const OrangeListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

OrangeListItem.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary article plate item

export const PrimaryPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

PrimaryPlateItem.decorators = [IndentsDecorator, PlateDecorator];

// Dark article plate item

export const DarkPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

DarkPlateItem.decorators = [IndentsDecorator, PlateDecorator, ThemeDecorator(Theme.DARK)];

// Orange article plate item

export const OrangePlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

OrangePlateItem.decorators = [IndentsDecorator, PlateDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
