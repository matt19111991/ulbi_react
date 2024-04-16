import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { articleDetailsReducer } from '@/entities/Article/testing';
import { userReducer } from '@/entities/User/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { article } from '@/shared/lib/generators/articles';

import { AdditionalInfoContainer } from './AdditionalInfoContainer';

const asyncReducers: ReducersList = {
  articleDetails: articleDetailsReducer,
  user: userReducer,
};

const stateBase: DeepPartial<StateSchema> = {
  articleDetails: {
    data: article,
    isLoading: false,
  },
  user: {
    authData: article.user,
  },
};

const meta = {
  title: 'pages/Article/ArticleDetailsPage/components/new/AdditionalInfoContainer',
  component: AdditionalInfoContainer,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AdditionalInfoContainer>;

type Story = StoryObj<typeof meta>;

// Primary additional info container

export const Primary: Story = {
  args: {
    isStorybook: true,
  },
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateBase, asyncReducers),
];

// Dark additional info container

export const Dark: Story = {
  args: {
    isStorybook: true,
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateBase, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange additional info container

export const Orange: Story = {
  args: {
    isStorybook: true,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateBase, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Loading additional info container

const stateLoading: DeepPartial<StateSchema> = {
  ...stateBase,
  articleDetails: {
    ...stateBase.articleDetails,
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {
    isStorybook: true,
  },
};

Loading.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateLoading, asyncReducers),
];

export default meta;
