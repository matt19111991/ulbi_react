import { DeepPartial } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { LoginForm } from './LoginForm';

const stateBase: DeepPartial<StateSchema> = {
  loginForm: {
    password: '123',
    username: 'user',
  },
};

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof LoginForm>;

type Story = StoryObj<typeof meta>;

// Primary Login Form

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateBase)];

// Dark Login Form

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateBase), ThemeDecorator(Theme.DARK)];

// Loading Login Form

const stateLoading: DeepPartial<StateSchema> = {
  loginForm: {
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {},
};

Loading.decorators = [StoreDecorator(stateLoading)];

// Login Form With Error

const stateWithError: DeepPartial<StateSchema> = {
  loginForm: {
    error: 'ERROR',
    password: '123',
    username: 'user',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [StoreDecorator(stateWithError)];

export default meta;
