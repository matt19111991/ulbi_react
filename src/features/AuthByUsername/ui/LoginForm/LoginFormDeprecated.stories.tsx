import type { Meta, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { loginReducer } from '../../model/slice/loginSlice';

import LoginForm from './LoginForm';

const asyncReducers: ReducersList = {
  loginForm: loginReducer,
};

const stateLoginForm: DeepPartial<StateSchema> = {
  loginForm: {
    password: '123',
    username: 'user',
  },
};

const meta = {
  title: 'features/Login/LoginForm/old',
  component: LoginForm,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof LoginForm>;

type Story = StoryObj<typeof meta>;

// Primary login form

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateLoginForm, asyncReducers)];

// Dark login form

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateLoginForm, asyncReducers), ThemeDecorator(Theme.DARK)];

// Orange login form

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateLoginForm, asyncReducers), ThemeDecorator(Theme.ORANGE)];

// Loading login form

const stateLoading: DeepPartial<StateSchema> = {
  loginForm: {
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {},
};

Loading.decorators = [StoreDecorator(stateLoading, asyncReducers)];

// Error login form

const stateError: DeepPartial<StateSchema> = {
  loginForm: {
    error: 'Login error',
    password: '123',
    username: 'user',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [StoreDecorator(stateError, asyncReducers)];

export default meta;
