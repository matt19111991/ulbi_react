import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { loginReducer } from '../../model/slice/loginSlice';

import { LoginModal } from './LoginModal';

const asyncReducers: ReducersList = {
  loginForm: loginReducer,
};

const stateLoginModal: DeepPartial<StateSchema> = {
  loginForm: {
    password: '123',
    username: 'user',
  },
};

const meta = {
  title: 'features/Login/LoginModal/old',
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
    onClose: action('onClose'),
  },
};

Primary.decorators = [StoreDecorator(stateLoginModal, asyncReducers)];

// Dark login modal

export const Dark: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
  },
};

Dark.decorators = [StoreDecorator(stateLoginModal, asyncReducers), ThemeDecorator(Theme.DARK)];

// Orange login modal

export const Orange: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
  },
};

Orange.decorators = [StoreDecorator(stateLoginModal, asyncReducers), ThemeDecorator(Theme.ORANGE)];

// Loading login modal

const stateLoading: DeepPartial<StateSchema> = {
  loginForm: {
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
  },
};

Loading.decorators = [StoreDecorator(stateLoading, asyncReducers)];

// Error login modal

const stateError: DeepPartial<StateSchema> = {
  loginForm: {
    error: 'Login error',
    password: '123',
    username: 'user',
  },
};

export const Error: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
  },
};

Error.decorators = [StoreDecorator(stateError, asyncReducers)];

export default meta;
