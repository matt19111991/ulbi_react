import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import Avatar from 'shared/assets/tests/storybook.jpg';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Navbar } from './Navbar';

const stateNavbar: DeepPartial<StateSchema> = {};

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

// Primary navbar

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateNavbar)];

// Dark navbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateNavbar), ThemeDecorator(Theme.DARK)];

// Orange navbar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateNavbar), ThemeDecorator(Theme.ORANGE)];

// Auth navbar

const stateAuth: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
};

export const Authorized: Story = {
  args: {
    storybookAvatar: Avatar,
  },
};

Authorized.decorators = [StoreDecorator(stateAuth)];

export default meta;
