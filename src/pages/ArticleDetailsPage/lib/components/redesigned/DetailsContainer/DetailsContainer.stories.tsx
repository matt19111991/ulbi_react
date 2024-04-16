import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { articleDetailsReducer } from '@/entities/Article/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { article } from '@/shared/lib/generators/articles';

import { DetailsContainer } from './DetailsContainer';

const asyncReducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const stateDetailsContainer: DeepPartial<StateSchema> = {
  articleDetails: {
    data: article,
  },
};

const meta = {
  title: 'pages/Article/ArticleDetailsPage/components/new/DetailsContainer',
  component: DetailsContainer,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof DetailsContainer>;

type Story = StoryObj<typeof meta>;

// Primary details container

export const Primary: Story = {
  args: {},
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateDetailsContainer, asyncReducers),
];

// Dark details container

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateDetailsContainer, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange details container

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateDetailsContainer, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
