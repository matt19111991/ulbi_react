import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { NotificationList } from './NotificationList';

const meta = {
  title: 'entities/Notification/NotificationList/old',
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

Primary.decorators = [IndentsDecorator];

// Dark notification list

export const Dark: Story = {
  args: {},
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange notification list

export const Orange: Story = {
  args: {},
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Loading notification list

export const Loading: Story = {
  args: {
    storybookLoading: true,
  },
};

Loading.decorators = [IndentsDecorator];

// Error notification list

export const Error: Story = {
  args: {
    storybookError: 'Error',
  },
};

Error.decorators = [IndentsDecorator];

export default meta;
