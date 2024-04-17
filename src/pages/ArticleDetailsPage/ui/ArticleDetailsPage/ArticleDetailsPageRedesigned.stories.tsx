import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { articleDetailsReducer } from '@/entities/Article/testing';
import type { Comment } from '@/entities/Comment/testing';

import Image1 from '@/shared/assets/tests/storybook.jpg';
import Image2 from '@/shared/assets/tests/storybook2.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';
import { article } from '@/shared/lib/generators/articles';

import { articleDetailsPageReducer } from '../../model/slices';

import ArticleDetailsPage from './ArticleDetailsPage';

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
    id: '1',
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
  articleDetails: {
    data: article,
  },
  articleDetailsPage: {
    comments: {
      areLoading: false,
      entities: normalizedEntities,
      ids: normalizedIds,
    },
  },
};

const asyncReducers: ReducersList = {
  articleDetails: articleDetailsReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

const meta = {
  title: 'pages/Article/ArticleDetailsPage/ArticleDetailsPage/new',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetailsPage>;

type Story = StoryObj<typeof meta>;

// Primary article details page

export const Primary: Story = {
  args: {
    isStorybook: true,
    storybookId: article.id,
  },
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleDetails, asyncReducers),
];

// Dark article details page

export const Dark: Story = {
  args: {
    isStorybook: true,
    storybookId: article.id,
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleDetails, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article details page

export const Orange: Story = {
  args: {
    isStorybook: true,
    storybookId: article.id,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleDetails, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Loading article details page

export const Loading: Story = {
  args: {
    isStorybook: true,
    storybookId: article.id,
    storybookLoading: true,
  },
};

const stateArticleLoading: DeepPartial<StateSchema> = {
  articleDetails: {
    isLoading: true,
  },
  articleDetailsPage: {
    comments: {
      areLoading: true,
      entities: {},
      ids: [],
    },
  },
};

Loading.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleLoading, asyncReducers),
];

// Error article details page

export const Error: Story = {
  args: {
    isStorybook: true,
    storybookError: 'Error',
    storybookId: article.id,
  },
};

const stateArticleError: DeepPartial<StateSchema> = {
  articleDetails: {
    error: 'Error',
  },
  articleDetailsPage: {
    comments: {
      areLoading: false,
      entities: {},
      ids: [],
    },
  },
};

Error.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleError, asyncReducers),
];

// Not found article details page

export const NotFound: Story = {
  args: {
    isStorybook: true,
  },
};

const stateArticleNotFound: DeepPartial<StateSchema> = {
  articleDetails: {},
};

NotFound.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateArticleNotFound, asyncReducers),
];

export default meta;
