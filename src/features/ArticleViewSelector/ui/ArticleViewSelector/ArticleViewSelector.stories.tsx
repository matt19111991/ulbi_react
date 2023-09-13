import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleView } from '@/entities/Article';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleViewSelector } from './ArticleViewSelector';

const stateArticleViewSelectorRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'features/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleViewSelector>;

type Story = StoryObj<typeof meta>;

// Primary article view selector old

export const PrimaryOld: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

// Dark article view selector old

export const DarkOld: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article view selector old

export const OrangeOld: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article view selector new

export const PrimaryNew: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateArticleViewSelectorRedesigned)];

// Dark article view selector new

export const DarkNew: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleViewSelectorRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange article view selector new

export const OrangeNew: Story = {
  args: {
    selectedView: ArticleView.LIST,
  },
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleViewSelectorRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
