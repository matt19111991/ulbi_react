import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { UserRole } from 'entities/User';

import Avatar from 'shared/assets/tests/storybook.jpg';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Navbar } from './Navbar';

const stateNavbar: DeepPartial<StateSchema> = {};

const meta = {
  title: 'widgets/Navbar',
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

Primary.decorators = [StoreDecorator(stateNavbar)];

// Dark navbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateNavbar), ThemeDecorator(Theme.DARK)];

// Orange navbar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateNavbar), ThemeDecorator(Theme.ORANGE)];

// Authorized user navbar

const stateAuthUser: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.USER],
      username: 'Jack',
    },
  },
};

export const AuthorizedUser: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedUser.decorators = [StoreDecorator(stateAuthUser)];

// Authorized manager navbar

const stateAuthManager: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.MANAGER],
      username: 'Mary',
    },
  },
};

export const AuthorizedManager: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedManager.decorators = [StoreDecorator(stateAuthManager)];

// Authorized admin navbar

const stateAuthAdmin: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.ADMIN],
      username: 'Tom',
    },
  },
};

export const AuthorizedAdmin: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedAdmin.decorators = [StoreDecorator(stateAuthAdmin)];

export default meta;
