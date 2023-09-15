import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleType } from '@/entities/Article';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleTypeTabs } from './ArticleTypeTabs';

const stateArticleTypeTabsRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'features/ArticleTypeTabs',
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleTypeTabs>;

type Story = StoryObj<typeof meta>;

// Primary article type tabs old

export const PrimaryOld: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

// Dark article type tabs old

export const DarkOld: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article type tabs old

export const OrangeOld: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article type tabs new

export const PrimaryNew: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateArticleTypeTabsRedesigned)];

// Dark article type tabs new

export const DarkNew: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleTypeTabsRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange article type tabs new

export const OrangeNew: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateArticleTypeTabsRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
