import type { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { userReducer, UserRole } from '@/entities/User/testing';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { AvatarDropdown } from './AvatarDropdown';

const asyncReducers: ReducersList = {
  user: userReducer,
};

const stateAuthUser: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.USER],
      username: 'Jack',
    },
  },
};

const stateAuthManager: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.MANAGER],
      username: 'Mary',
    },
  },
};

const stateAuthAdmin: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.ADMIN],
      username: 'Tom',
    },
  },
};

const meta = {
  title: 'features/Header/AvatarDropdown/old',
  component: AvatarDropdown,
  argsTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [
    (Story: StoryFn, context: StoryContext) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{Story({}, context)}</div>
    ),
  ],
} as Meta<typeof AvatarDropdown>;

type Story = StoryObj<typeof meta>;

// Primary avatar dropdown

export const Primary: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

// Dark avatar dropdown

export const Dark: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange avatar dropdown

export const Orange: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Authorized user avatar dropdown

export const AuthorizedUser: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedUser.decorators = [StoreDecorator(stateAuthUser, asyncReducers)];

// Authorized manager avatar dropdown

export const AuthorizedManager: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedManager.decorators = [StoreDecorator(stateAuthManager, asyncReducers)];

// Authorized admin avatar dropdown

export const AuthorizedAdmin: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedAdmin.decorators = [StoreDecorator(stateAuthAdmin, asyncReducers)];

export default meta;
