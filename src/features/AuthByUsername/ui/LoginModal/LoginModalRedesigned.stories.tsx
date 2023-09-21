import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

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

const stateLoginModalRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'features/LoginModal/new',
  component: LoginModal,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [RedesignDecorator, StoreDecorator(stateLoginModalRedesigned)],
} as Meta<typeof LoginModal>;

type Story = StoryObj<typeof meta>;

// Primary login modal

export const Primary: Story = {
  args: {
    isOpen: true,
  },
};

Primary.decorators = [StoreDecorator(stateLoginModal)];

// Dark login modal

export const Dark: Story = {
  args: {
    isOpen: true,
  },
};

Dark.decorators = [StoreDecorator(stateLoginModal), ThemeDecorator(Theme.DARK)];

// Orange login modal

export const Orange: Story = {
  args: {
    isOpen: true,
  },
};

Orange.decorators = [StoreDecorator(stateLoginModal), ThemeDecorator(Theme.ORANGE)];

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

Loading.decorators = [StoreDecorator(stateLoading)];

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

Error.decorators = [StoreDecorator(stateError)];

export default meta;
