import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { articleDetailsReducer } from '@/entities/Article/testing';
import type { Comment } from '@/entities/Comment/testing';

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

const comment: Comment = {
  id: '1',
  text: 'Nice article!',
  user: {
    avatar: Image2,
    id: '2',
    username: 'Mary',
  },
};

const normalizedEntities: Record<Comment['id'], Comment> = {
  [comment.id]: comment,
};

const normalizedIds: Array<Comment['id']> = [comment.id];

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
  args: {
    isStorybook: true,
  },
} as Meta<typeof ArticleDetailsPage>;

type Story = StoryObj<typeof meta>;

// Primary article details page

export const Primary: Story = {
  args: {
    storybookId: '1',
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
    storybookId: '1',
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
    storybookId: '1',
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
    storybookId: '1',
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
    storybookError: 'Error',
    storybookId: '1',
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
  args: {},
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
