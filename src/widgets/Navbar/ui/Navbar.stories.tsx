import type { Meta, StoryObj } from '@storybook/react';
import { StoryFn } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { UserRole } from '@/entities/User';

import Avatar from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Navbar } from './Navbar';

const FullWidthDecorator = (Story: StoryFn) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
    <Story />
  </div>
);

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

// Primary navbar old

export const PrimaryOld: Story = {
  args: {},
};

// Dark navbar old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange navbar old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Authorized navbar old

const stateAuthorizedOld: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      roles: [UserRole.USER],
      username: 'Jack',
    },
  },
};

export const AuthorizedOld: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedOld.decorators = [StoreDecorator(stateAuthorizedOld)];

// Primary navbar new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), FullWidthDecorator];

// Dark navbar new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullWidthDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange navbar new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullWidthDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Authorized navbar new

const stateAuthorizedNew: DeepPartial<StateSchema> = {
  user: {
    authData: {
      id: '1',
      features: {
        isAppRedesigned: true,
      },
      roles: [UserRole.USER],
      username: 'Jack',
    },
  },
};

export const AuthorizedNew: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

AuthorizedNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullWidthDecorator,
  StoreDecorator(stateAuthorizedNew),
];

export default meta;
