import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { articleDetailsReducer } from '@/entities/Article/testing';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

const asyncReducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const stateNotEditable: DeepPartial<StateSchema> = {};

const stateEditable: DeepPartial<StateSchema> = {
  articleDetails: {
    data: {
      id: '11',
      user: {
        id: '1',
        username: 'Jack',
      },
    },
  },
  user: {
    authData: {
      id: '1',
      username: 'Jack',
    },
  },
};

const meta = {
  title: 'pages/Article/ArticleDetailsPage/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetailsPageHeader>;

type Story = StoryObj<typeof meta>;

// Primary not editable

export const PrimaryNotEditable: Story = {
  args: {},
};

PrimaryNotEditable.decorators = [IndentsDecorator, StoreDecorator(stateNotEditable, asyncReducers)];

// Dark not editable

export const DarkNotEditable: Story = {
  args: {},
};

DarkNotEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateNotEditable, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange not editable

export const OrangeNotEditable: Story = {
  args: {},
};

OrangeNotEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateNotEditable, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Primary editable

export const PrimaryEditable: Story = {
  args: {},
};

PrimaryEditable.decorators = [IndentsDecorator, StoreDecorator(stateEditable, asyncReducers)];

// Dark editable

export const DarkEditable: Story = {
  args: {},
};

DarkEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateEditable, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange editable

export const OrangeEditable: Story = {
  args: {},
};

OrangeEditable.decorators = [
  IndentsDecorator,
  StoreDecorator(stateEditable, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
