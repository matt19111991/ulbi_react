import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { NotificationList } from './NotificationList';

const meta = {
  title: 'entities/Notification/NotificationList/new',
  component: NotificationList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof NotificationList>;

type Story = StoryObj<typeof meta>;

// Primary notification list

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark notification list

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange notification list

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Loading notification list

export const Loading: Story = {
  args: {
    storybookLoading: true,
  },
};

Loading.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Error notification list

export const Error: Story = {
  args: {
    storybookError: 'Error',
  },
};

Error.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
