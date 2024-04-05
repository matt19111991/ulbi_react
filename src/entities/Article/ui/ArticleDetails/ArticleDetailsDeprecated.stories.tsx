import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { article } from '@/shared/lib/generators/articles';

import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import { ArticleDetails } from './ArticleDetails';

const asyncReducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const stateArticleDetails: DeepPartial<StateSchema> = {
  articleDetails: {
    data: article,
  },
};

const meta = {
  title: 'entities/Article/ArticleDetails/old',
  component: ArticleDetails,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetails>;

type Story = StoryObj<typeof meta>;

// Primary article details

export const Primary: Story = {
  args: {},
};

Primary.decorators = [IndentsDecorator, StoreDecorator(stateArticleDetails, asyncReducers)];

// Dark article details

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleDetails, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article details

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  IndentsDecorator,
  StoreDecorator(stateArticleDetails, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Loading article details

const stateArticleDetailsLoading: DeepPartial<StateSchema> = {
  articleDetails: {
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {},
};

Loading.decorators = [IndentsDecorator, StoreDecorator(stateArticleDetailsLoading, asyncReducers)];

// Error article details

const stateArticleDetailsError: DeepPartial<StateSchema> = {
  articleDetails: {
    error: 'Error',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [IndentsDecorator, StoreDecorator(stateArticleDetailsError, asyncReducers)];

export default meta;
