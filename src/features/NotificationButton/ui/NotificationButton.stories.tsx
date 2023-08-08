import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { NotificationButton } from './NotificationButton';

const stateNotificationButton: DeepPartial<StateSchema> = {};

const meta = {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof NotificationButton>;

type Story = StoryObj<typeof meta>;

// Primary notification button

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateNotificationButton)];

// Dark notification button

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  StoreDecorator(stateNotificationButton),
  ThemeDecorator(Theme.DARK),
];

// Orange notification button

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  StoreDecorator(stateNotificationButton),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
