import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import Image1 from 'shared/assets/tests/storybook.jpg';
import Image2 from 'shared/assets/tests/storybook2.jpg';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleDetailsComments } from './ArticleDetailsComments';

const stateArticleDetailsComments: DeepPartial<StateSchema> = {
  articleDetailsPage: {
    comments: {
      areLoading: false,
      entities: {
        1: {
          id: '1',
          text: 'First comment',
          user: {
            avatar: Image1,
            id: '1',
            username: 'Jack',
          },
        },
        2: {
          id: '1',
          text: 'Nice article!',
          user: {
            avatar: Image2,
            id: '2',
            username: 'Mary',
          },
        },
      },
      ids: ['1', '2'],
    },
  },
};

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

// Primary article details comments

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticleDetailsComments)];

// Dark article details comments

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  StoreDecorator(stateArticleDetailsComments),
  ThemeDecorator(Theme.DARK),
];

// Orange article details comments

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  StoreDecorator(stateArticleDetailsComments),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
