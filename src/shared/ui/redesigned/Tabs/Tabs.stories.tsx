import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Tabs } from './Tabs';

const tabs = [
  { content: 'tab 1', value: 'tab 1' },
  { content: 'tab 2', value: 'tab 2' },
  { content: 'tab 3', value: 'tab 3' },
];

const meta = {
  title: 'shared/components/new/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

// Primary tabs

export const Primary: Story = {
  args: {
    onTabClick: action('onTabClick'),
    tabs,
    value: 'tab 2',
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark tabs

export const Dark: Story = {
  args: {
    onTabClick: action('onTabClick'),
    tabs,
    value: 'tab 2',
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange tabs

export const Orange: Story = {
  args: {
    onTabClick: action('onTabClick'),
    tabs,
    value: 'tab 2',
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Tabs in column

export const Column: Story = {
  args: {
    direction: 'column',
    onTabClick: action('onTabClick'),
    tabs,
    value: 'tab 2',
  },
};

Column.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
