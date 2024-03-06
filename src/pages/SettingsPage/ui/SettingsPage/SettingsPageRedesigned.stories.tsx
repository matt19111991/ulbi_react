import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import SettingsPage from './SettingsPage';

const meta = {
  title: 'pages/Settings/SettingsPage/new',
  component: SettingsPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof SettingsPage>;

type Story = StoryObj<typeof meta>;

// Primary settings page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark settings page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange settings page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
