import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Sidebar } from './Sidebar';

const stateAuthorizedOld: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
};

const stateAuthorizedNew: DeepPartial<StateSchema> = redesignState;

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

// Primary sidebar old

export const PrimaryOld: Story = {
  args: {},
};

PrimaryOld.decorators = [StoreDecorator(stateAuthorizedOld)];

// Dark sidebar old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [StoreDecorator(stateAuthorizedOld), ThemeDecorator(Theme.DARK)];

// Orange sidebar old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [StoreDecorator(stateAuthorizedOld), ThemeDecorator(Theme.ORANGE)];

// Primary sidebar new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [
  (Story) => (
    <div style={{ height: '100vh' }}>
      <Story />
    </div>
  ),
  RedesignDecorator,
  StoreDecorator(stateAuthorizedNew),
];

// Dark sidebar new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  (Story) => (
    <div style={{ height: '100vh' }}>
      <Story />
    </div>
  ),
  RedesignDecorator,
  StoreDecorator(stateAuthorizedNew),
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  (Story) => (
    <div style={{ height: '100vh' }}>
      <Story />
    </div>
  ),
  RedesignDecorator,
  StoreDecorator(stateAuthorizedNew),
  ThemeDecorator(Theme.ORANGE),
];

// Unauthorized sidebar

export const Unauthorized: Story = {
  args: {},
};

export default meta;
