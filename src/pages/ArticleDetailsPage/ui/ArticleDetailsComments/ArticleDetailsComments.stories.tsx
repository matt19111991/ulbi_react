import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import Image1 from '@/shared/assets/tests/storybook.jpg';
import Image2 from '@/shared/assets/tests/storybook2.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { articleDetailsPageReducer } from '../../model/slices';

import { ArticleDetailsComments } from './ArticleDetailsComments';

const asyncReducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

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
  title: 'pages/Article/ArticleDetailsPage/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetailsComments>;

type Story = StoryObj<typeof meta>;

// Primary article details comments old

export const PrimaryOld: Story = {
  args: {},
};

PrimaryOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleDetailsComments, asyncReducers),
];

// Dark article details comments old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleDetailsComments, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article details comments old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleDetailsComments, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Primary article details comments new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleDetailsComments, asyncReducers),
];

// Dark article details comments new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleDetailsComments, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article details comments new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleDetailsComments, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
