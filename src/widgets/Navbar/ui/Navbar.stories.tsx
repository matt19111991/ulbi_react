import { DeepPartial } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Navbar } from './Navbar';

const stateBase: DeepPartial<StateSchema> = {};

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

Light.decorators = [StoreDecorator(stateBase)];

// Dark navbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateBase), ThemeDecorator(Theme.DARK)];

// Auth navbar

const stateAuth: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
};

export const Authorized: Story = {
  args: {},
};

Authorized.decorators = [StoreDecorator(stateAuth)];

export default meta;
