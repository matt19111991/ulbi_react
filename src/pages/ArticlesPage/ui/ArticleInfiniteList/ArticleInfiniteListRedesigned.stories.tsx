import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';
import { generateNormalizedArticles } from '@/shared/lib/generators/articles';

import { articlesPageReducer } from '../../model/slice/articlesPageSlice';

import { ArticleInfiniteList } from './ArticleInfiniteList';

const generatedArticles = generateNormalizedArticles(18);

const asyncReducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const stateArticleInfiniteList: DeepPartial<StateSchema> = {
  articlesPage: {
    entities: generatedArticles.entities,
    ids: generatedArticles.ids,
  },
};

const meta = {
  title: 'pages/Article/Articles/ArticleInfiniteList/new',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1240 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ArticleInfiniteList>;

type Story = StoryObj<typeof meta>;

// Primary article infinite list

export const Primary: Story = {
  args: {},
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleInfiniteList, asyncReducers),
];

// Dark article infinite list

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleInfiniteList, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange article infinite list

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateArticleInfiniteList, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
