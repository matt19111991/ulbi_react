import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { generateNotifications } from '@/shared/lib/generators/notifications';

import { NotificationItem } from './NotificationItem';

const [notificationWithLink] = generateNotifications(1);

const meta = {
  title: 'entities/Notification/NotificationItem/old',
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

Primary.decorators = [IndentsDecorator];

// Dark notification item

export const Dark: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange notification item

export const Orange: Story = {
  args: {
    notification: {
      ...notificationWithLink,
      href: undefined,
    },
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Link notification item primary

export const LinkPrimary: Story = {
  args: {
    notification: notificationWithLink,
  },
};

LinkPrimary.decorators = [IndentsDecorator];

// Link notification item dark

export const LinkDark: Story = {
  args: {
    notification: notificationWithLink,
  },
};

LinkDark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Link notification item orange

export const LinkOrange: Story = {
  args: {
    notification: notificationWithLink,
  },
};

LinkOrange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
