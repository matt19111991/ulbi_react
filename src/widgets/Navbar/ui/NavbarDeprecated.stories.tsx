import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { userReducer, UserRole } from '@/entities/User/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { Navbar } from './Navbar';

const meta = {
  title: 'widgets/Navbar/Navbar/old',
  component: Navbar,
  argsTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof meta>;

// Primary navbar

export const Primary: Story = {
  args: {},
};

// Dark navbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange navbar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Authorized navbar

const asyncReducers: ReducersList = {
  user: userReducer,
};

const stateAuthorized: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.USER],
      username: 'Jack',
    },
  },
};

export const Authorized: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

Authorized.decorators = [StoreDecorator(stateAuthorized, asyncReducers)];

export default meta;
