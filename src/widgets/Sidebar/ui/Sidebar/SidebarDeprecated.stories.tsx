import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { userReducer } from '@/entities/User/testing';

import '@/shared/config/i18n/i18nForStorybook';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { Sidebar } from './Sidebar';

const asyncReducers: ReducersList = {
  user: userReducer,
};

const stateAuthorized: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
};

const meta = {
  title: 'widgets/Sidebar/Sidebar/old',
  component: Sidebar,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Sidebar>;

type Story = StoryObj<typeof meta>;

// Primary sidebar

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateAuthorized, asyncReducers)];

// Dark sidebar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateAuthorized, asyncReducers), ThemeDecorator(Theme.DARK)];

// Orange sidebar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateAuthorized, asyncReducers), ThemeDecorator(Theme.ORANGE)];

// Unauthorized sidebar

export const Unauthorized: Story = {
  args: {},
};

export default meta;
