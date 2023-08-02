import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleInfiniteList } from './ArticleInfiniteList';

const stateArticleInfiniteList: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleInfiniteList>;

type Story = StoryObj<typeof meta>;

// Primary ArticleInfiniteList

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticleInfiniteList)];

// Dark ArticleInfiniteList

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateArticleInfiniteList), ThemeDecorator(Theme.DARK)];

// Orange ArticleInfiniteList

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateArticleInfiniteList), ThemeDecorator(Theme.ORANGE)];

export default meta;
