import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { LoginModal } from './LoginModal';

const stateLoginModal: DeepPartial<StateSchema> = {
  loginForm: {
    password: '123',
    username: 'user',
  },
};

const meta = {
  title: 'features/Login/LoginModal/new',
  component: LoginModal,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof LoginModal>;

type Story = StoryObj<typeof meta>;

// Primary login modal

export const Primary: Story = {
  args: {
    isOpen: true,
  },
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateLoginModal),
];

// Dark login modal

export const Dark: Story = {
  args: {
    isOpen: true,
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateLoginModal),
  ThemeDecorator(Theme.DARK),
];

// Orange login modal

export const Orange: Story = {
  args: {
    isOpen: true,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateLoginModal),
  ThemeDecorator(Theme.ORANGE),
];

// Loading login modal

const stateLoading: DeepPartial<StateSchema> = {
  loginForm: {
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
  },
};

Loading.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  StoreDecorator(stateLoading),
];

// Error login modal

const stateError: DeepPartial<StateSchema> = {
  loginForm: {
    error: 'ERROR',
    password: '123',
    username: 'user',
  },
};

export const Error: Story = {
  args: {
    isOpen: true,
  },
};

Error.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), StoreDecorator(stateError)];

export default meta;
