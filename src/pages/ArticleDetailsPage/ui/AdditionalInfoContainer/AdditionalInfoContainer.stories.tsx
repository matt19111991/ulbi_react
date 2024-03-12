import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { articleDetailsReducer } from '@/entities/Article/testing';
import { userReducer } from '@/entities/User/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { AdditionalInfoContainer } from './AdditionalInfoContainer';

const asyncReducers: ReducersList = {
  articleDetails: articleDetailsReducer,
  user: userReducer,
};

const stateBase: DeepPartial<StateSchema> = {
  articleDetails: {
    data: {
      id: '11',
      user: {
        avatar: Avatar,
        id: '1',
        username: 'Jack',
      },
    },
    isLoading: false,
  },
  user: {
    authData: {
      id: '1',
      username: 'Jack',
    },
  },
};

const stateLoading: DeepPartial<StateSchema> = {
  ...stateBase,
  articleDetails: {
    ...stateBase.articleDetails,
    isLoading: true,
  },
};

const meta = {
  title: 'pages/Article/ArticleDetailsPage/AdditionalInfoContainer',
  component: AdditionalInfoContainer,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  args: {
    isStorybook: true,
  },
} as Meta<typeof AdditionalInfoContainer>;

type Story = StoryObj<typeof meta>;

// Primary additional info container

export const Primary: Story = {
  args: {},
};

Primary.decorators = [IndentsDecorator, StoreDecorator(stateBase, asyncReducers)];

// Dark additional info container

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  IndentsDecorator,
  StoreDecorator(stateBase, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange additional info container

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  IndentsDecorator,
  StoreDecorator(stateBase, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Loading additional info container

export const Loading: Story = {
  args: {},
};

Loading.decorators = [IndentsDecorator, StoreDecorator(stateLoading, asyncReducers)];

export default meta;
