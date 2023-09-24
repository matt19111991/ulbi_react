import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Sidebar } from './Sidebar';

const stateAuthorizedOld: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
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

const FullHeightDecorator = (Story: StoryFn) => (
  <div style={{ height: '100vh' }}>
    <Story />
  </div>
);

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

// Unauthorized sidebar old

export const UnauthorizedOld: Story = {
  args: {},
};

// Primary sidebar new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), FullHeightDecorator];

// Dark sidebar new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Unauthorized sidebar new

export const UnauthorizedNew: Story = {
  args: {},
};

UnauthorizedNew.decorators = [FullHeightDecorator];

export default meta;
