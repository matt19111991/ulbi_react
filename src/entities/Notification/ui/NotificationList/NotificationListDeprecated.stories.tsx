import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { NotificationList } from './NotificationList';

const meta = {
  title: 'entities/NotificationList/old',
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

// Dark notification list

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange notification list

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Loading notification list

export const Loading: Story = {
  args: {
    storybookLoading: true,
  },
};

// Error notification list

export const Error: Story = {
  args: {
    storybookError: 'Error',
  },
};

export default meta;
