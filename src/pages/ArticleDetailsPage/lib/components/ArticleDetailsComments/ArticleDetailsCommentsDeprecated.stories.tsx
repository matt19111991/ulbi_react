import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import type { Comment } from '@/entities/Comment/testing';

import Image1 from '@/shared/assets/tests/storybook.jpg';
import Image2 from '@/shared/assets/tests/storybook2.jpg';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { articleDetailsPageReducer } from '../../../model/slices';

import { ArticleDetailsComments } from './ArticleDetailsComments';

const asyncReducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const comments: Comment[] = [
  {
    id: '1',
    text: 'First comment',
    user: {
      avatar: Image1,
      id: '1',
      username: 'Jack',
    },
  },
  {
    id: '2',
    text: 'Nice article!',
    user: {
      avatar: Image2,
      id: '2',
      username: 'Mary',
    },
  },
];

const normalizedEntities: Record<Comment['id'], Comment> = {
  [comments[0].id]: comments[0],
  [comments[1].id]: comments[1],
};

const normalizedIds: Array<Comment['id']> = [comments[0].id, comments[1].id];

const stateArticleDetails: DeepPartial<StateSchema> = {
  articleDetailsPage: {
    comments: {
      areLoading: false,
      entities: normalizedEntities,
      ids: normalizedIds,
    },
  },
};

const meta = {
  title: 'pages/Article/ArticleDetailsPage/components/old/ArticleDetailsComments',
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

Primary.decorators = [IndentsDecorator, StoreDecorator(stateArticleDetails, asyncReducers)];

// Dark article details comments

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleDetails, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article details comments

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleDetails, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
