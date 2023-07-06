import { DeepPartial } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { LoginForm } from './LoginForm';

const initialState: DeepPartial<StateSchema> = {
  loginForm: {
    isLoading: false,
    password: '',
    username: '',
  },
};

const options = { initialState };

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

Primary.decorators = [StoreDecorator(options)];

// Dark Login Form

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(options), ThemeDecorator(Theme.DARK)];

export default meta;
