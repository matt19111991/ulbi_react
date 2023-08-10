import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/app/providers/ThemeProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Sidebar } from './Sidebar';

const stateAuthorized: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
};

const stateUnAuthorized: DeepPartial<StateSchema> = {
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

// Primary sidebar

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateAuthorized)];

// Dark sidebar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateAuthorized), ThemeDecorator(Theme.DARK)];

// Orange sidebar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateAuthorized), ThemeDecorator(Theme.ORANGE)];

// Unauthorized sidebar

export const Unauthorized: Story = {
  args: {},
};

Unauthorized.decorators = [StoreDecorator(stateUnAuthorized)];

export default meta;
