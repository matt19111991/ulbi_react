import { DeepPartial } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Navbar } from './Navbar';

const state: DeepPartial<StateSchema> = {
  loginForm: {
    password: '123',
    username: 'user',
  },
};

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

// Light navbar

export const Light: Story = {
  args: {},
};

Light.decorators = [StoreDecorator(state)];

// Dark navbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(state), ThemeDecorator(Theme.DARK)];

export default meta;
