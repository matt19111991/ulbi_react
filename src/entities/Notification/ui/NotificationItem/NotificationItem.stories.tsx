import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { generateNotifications } from '@/shared/lib/generators/notifications';

import { NotificationItem } from './NotificationItem';

const [notificationWithLink] = generateNotifications(1);

const meta = {
  title: 'entities/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof NotificationItem>;

type Story = StoryObj<typeof meta>;

// Primary notification item

export const Primary: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

// Dark notification item

export const Dark: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange notification item

export const Orange: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Link notification item

export const Link: Story = {
  args: {
    notification: notificationWithLink,
  },
};

export default meta;
