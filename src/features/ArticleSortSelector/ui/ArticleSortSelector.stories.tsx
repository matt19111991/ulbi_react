import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField } from '@/entities/Article';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleSortSelector } from './ArticleSortSelector';

const stateArticleSortSelectorRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'features/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleSortSelector>;

type Story = StoryObj<typeof meta>;

// Primary article sort selector old

export const PrimaryOld: Story = {
  args: {},
};

// Dark article sort selector old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article sort selector old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article sort selector new

export const PrimaryNew: Story = {
  args: {
    order: 'asc',
    sort: ArticleSortField.CREATED,
  },
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateArticleSortSelectorRedesigned)];

// Dark article sort selector new

export const DarkNew: Story = {
  args: {
    order: 'asc',
    sort: ArticleSortField.CREATED,
  },
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleSortSelectorRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange article sort selector new

export const OrangeNew: Story = {
  args: {
    order: 'asc',
    sort: ArticleSortField.CREATED,
  },
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleSortSelectorRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
