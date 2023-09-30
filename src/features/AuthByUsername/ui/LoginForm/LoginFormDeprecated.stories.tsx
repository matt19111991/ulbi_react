import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import LoginForm from './LoginForm';

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

Primary.decorators = [StoreDecorator(stateLoginForm)];

// Dark login form

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateLoginForm), ThemeDecorator(Theme.DARK)];

// Orange login form

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateLoginForm), ThemeDecorator(Theme.ORANGE)];

// Loading login form

const stateLoading: DeepPartial<StateSchema> = {
  loginForm: {
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {},
};

Loading.decorators = [StoreDecorator(stateLoading)];

// Error login form

const stateError: DeepPartial<StateSchema> = {
  loginForm: {
    error: 'ERROR',
    password: '123',
    username: 'user',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [StoreDecorator(stateError)];

export default meta;
