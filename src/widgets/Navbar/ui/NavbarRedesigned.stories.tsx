import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { UserRole } from '@/entities/User/testing';

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
  title: 'widgets/Navbar/Navbar/new',
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

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), FullWidthDecorator];

// Dark navbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullWidthDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange navbar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullWidthDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Authorized navbar

const stateAuthorized: DeepPartial<StateSchema> = {
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

export const Authorized: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

Authorized.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullWidthDecorator,
  StoreDecorator(stateAuthorized),
];

export default meta;
