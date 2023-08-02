import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleDetailsComments } from './ArticleDetailsComments';

const stateArticleDetailsComments: DeepPartial<StateSchema> = {};

const meta = {
  title: 'pages/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetailsComments>;

type Story = StoryObj<typeof meta>;

// Primary ArticleDetailsComments

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticleDetailsComments)];

// Dark ArticleDetailsComments

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateArticleDetailsComments), ThemeDecorator(Theme.DARK)];

// Orange ArticleDetailsComments

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateArticleDetailsComments), ThemeDecorator(Theme.ORANGE)];

export default meta;
