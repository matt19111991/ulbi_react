import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { UserRole } from '@/entities/User';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { AvatarDropdown } from './AvatarDropdown';

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

// Primary avatar dropdown old

export const PrimaryOld: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

// Dark avatar dropdown old

export const DarkOld: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange avatar dropdown old

export const OrangeOld: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Authorized user avatar dropdown old

export const AuthorizedUserOld: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedUserOld.decorators = [StoreDecorator(stateAuthUser)];

// Authorized manager avatar dropdown old

export const AuthorizedManagerOld: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedManagerOld.decorators = [StoreDecorator(stateAuthManager)];

// Authorized admin avatar dropdown old

export const AuthorizedAdminOld: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedAdminOld.decorators = [StoreDecorator(stateAuthAdmin)];

// Primary avatar dropdown new

export const PrimaryNew: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark avatar dropdown new

export const DarkNew: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange avatar dropdown new

export const OrangeNew: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Authorized user avatar dropdown new

export const AuthorizedUserNew: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedUserNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator({
    user: {
      ...stateAuthUser.user,
      authData: {
        ...stateAuthUser.user?.authData,
        features: {
          isAppRedesigned: true,
        },
      },
    },
  }),
];

// Authorized manager avatar dropdown new

export const AuthorizedManagerNew: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedManagerNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator({
    user: {
      ...stateAuthManager.user,
      authData: {
        ...stateAuthManager.user?.authData,
        features: {
          isAppRedesigned: true,
        },
      },
    },
  }),
];

// Authorized admin avatar dropdown new

export const AuthorizedAdminNew: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedAdminNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator({
    user: {
      ...stateAuthAdmin.user,
      authData: {
        ...stateAuthAdmin.user?.authData,
        features: {
          isAppRedesigned: true,
        },
      },
    },
  }),
];

export default meta;
