import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleView } from '@/entities/Article/testing';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { generateNormalizedArticles } from '@/shared/lib/generators/articles';

import { articlesPageReducer } from '../../../../model/slice/articlesPageSlice';

import { ArticleInfiniteList } from './ArticleInfiniteList';

const MaxWidthDecorator = (Story: ReturnType<StoryFn>) => (
  <div style={{ width: 1274 }}>
    <Story />
  </div>
);

const generatedArticles = generateNormalizedArticles(18);

const asyncReducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const statePlates: DeepPartial<StateSchema> = {
  articlesPage: {
    entities: generatedArticles.entities,
    ids: generatedArticles.ids,
    view: ArticleView.PLATE,
  },
};

const meta = {
  title: 'pages/Article/Articles/components/new/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleInfiniteList>;

type Story = StoryObj<typeof meta>;

// PLATES

// Primary article infinite list (plate view)

export const PrimaryPlates: Story = {
  args: {},
};

PrimaryPlates.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  MaxWidthDecorator,
  StoreDecorator(statePlates, asyncReducers),
];

// Dark article infinite list (plate view)

export const DarkPlates: Story = {
  args: {},
};

DarkPlates.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  MaxWidthDecorator,
  StoreDecorator(statePlates, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article infinite list (plate view)

export const OrangePlates: Story = {
  args: {},
};

OrangePlates.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  MaxWidthDecorator,
  StoreDecorator(statePlates, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// LIST

const stateList: DeepPartial<StateSchema> = {
  articlesPage: {
    entities: generatedArticles.entities,
    ids: generatedArticles.ids,
    view: ArticleView.LIST,
  },
};

// Primary article infinite list (list view)

export const PrimaryList: Story = {
  args: {},
};

PrimaryList.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateList, asyncReducers),
];

// Dark article infinite list (list view)

export const DarkList: Story = {
  args: {},
};

DarkList.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateList, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article infinite list (list view)

export const OrangeList: Story = {
  args: {},
};

OrangeList.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  StoreDecorator(stateList, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
