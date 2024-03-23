import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { AppLink } from './AppLink';

const meta = {
  title: 'shared/components/new/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  args: {
    to: '/test', // для всех 'stories'
  },
} as Meta<typeof AppLink>;

type Story = StoryObj<typeof meta>;

// Primary light app link

export const PrimaryLight: Story = {
  args: {
    children: 'Text',
    variant: 'primary',
  },
};

PrimaryLight.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Red light app link

export const RedLight: Story = {
  args: {
    children: 'Text',
    variant: 'red',
  },
};

RedLight.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Primary dark app link

export const PrimaryDark: Story = {
  args: {
    children: 'Text',
    variant: 'primary',
  },
};

PrimaryDark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Red dark app link

export const RedDark: Story = {
  args: {
    children: 'Text',
    variant: 'red',
  },
};

RedDark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Primary orange app link

export const PrimaryOrange: Story = {
  args: {
    children: 'Text',
    variant: 'primary',
  },
};

PrimaryOrange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Red orange app link

export const RedOrange: Story = {
  args: {
    children: 'Text',
    variant: 'red',
  },
};

RedOrange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
