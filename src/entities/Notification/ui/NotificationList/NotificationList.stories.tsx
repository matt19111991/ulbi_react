import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { NotificationList } from './NotificationList';

const stateNotificationList: DeepPartial<StateSchema> = {};

const meta = {
  title: 'entities/NotificationList',
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

Primary.decorators = [StoreDecorator(stateNotificationList)];

// Dark notification list

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  StoreDecorator(stateNotificationList),
  ThemeDecorator(Theme.DARK),
];

// Orange notification list

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  StoreDecorator(stateNotificationList),
  ThemeDecorator(Theme.ORANGE),
];

// Loading notification list

export const Loading: Story = {
  args: {
    storybookLoading: true,
  },
};

Loading.decorators = [StoreDecorator(stateNotificationList)];

// Error notification list

export const Error: Story = {
  args: {
    storybookError: 'Error',
  },
};

Error.decorators = [StoreDecorator(stateNotificationList)];

export default meta;
