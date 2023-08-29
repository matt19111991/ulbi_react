import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { UserRole } from '@/entities/User';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { AvatarDropdown } from './AvatarDropdown';

const stateAvatarDropdown: DeepPartial<StateSchema> = {};

const meta = {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argsTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
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

Primary.decorators = [StoreDecorator(stateAvatarDropdown)];

// Dark avatar dropdown

export const Dark: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

Dark.decorators = [StoreDecorator(stateAvatarDropdown), ThemeDecorator(Theme.DARK)];

// Orange avatar dropdown

export const Orange: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

Orange.decorators = [StoreDecorator(stateAvatarDropdown), ThemeDecorator(Theme.ORANGE)];

// Authorized user avatar dropdown

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

// Authorized manager avatar dropdown

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

// Authorized admin avatar dropdown

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
