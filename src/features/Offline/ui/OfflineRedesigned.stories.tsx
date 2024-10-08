import type { Meta, StoryObj } from '@storybook/react';

import '@/shared/config/i18n/i18nForStorybook';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Offline } from './Offline';

const meta = {
  title: 'features/Offline/Popover/new',
  component: Offline,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Offline>;

type Story = StoryObj<typeof meta>;

// Primary offline

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark offline

export const Dark: Story = {
  args: {},
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange offline

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
