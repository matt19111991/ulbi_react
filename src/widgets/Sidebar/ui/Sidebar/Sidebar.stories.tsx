import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Sidebar } from './Sidebar';

const authorizedState: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
};

const unAuthorizedState: DeepPartial<StateSchema> = {
  user: {},
};

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Sidebar>;

type Story = StoryObj<typeof meta>;

// Light sidebar

export const Light: Story = {
  args: {},
};

Light.decorators = [StoreDecorator(authorizedState)];

// Dark sidebar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(authorizedState), ThemeDecorator(Theme.DARK)];

// Unauthorized sidebar

export const Unauthorized: Story = {
  args: {},
};

Unauthorized.decorators = [StoreDecorator(unAuthorizedState)];

export default meta;
