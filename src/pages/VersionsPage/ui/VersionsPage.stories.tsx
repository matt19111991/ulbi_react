import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { VersionsPage } from './VersionsPage';

const meta = {
  title: 'pages/Versions/VersionsPage/new',
  component: VersionsPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof VersionsPage>;

type Story = StoryObj<typeof meta>;

// Primary versions page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark versions page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange versions page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
