import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { generateNotifications } from '@/shared/lib/generators/notifications';

import { NotificationItem } from './NotificationItem';

const [notificationWithLink] = generateNotifications(1);

const meta = {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof NotificationItem>;

type Story = StoryObj<typeof meta>;

// Primary notification item old

export const PrimaryOld: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

// Dark notification item old

export const DarkOld: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange notification item old

export const OrangeOld: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Link notification item old

export const LinkOld: Story = {
  args: {
    notification: notificationWithLink,
  },
};

// Primary notification item new

export const PrimaryNew: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark notification item new

export const DarkNew: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange notification item new

export const OrangeNew: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Link notification item new

export const LinkNew: Story = {
  args: {
    notification: notificationWithLink,
  },
};

LinkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

export default meta;
