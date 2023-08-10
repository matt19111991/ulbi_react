import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/app/providers/ThemeProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

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
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof NotificationButton>;

type Story = StoryObj<typeof meta>;

// Primary desktop notification button

export const PrimaryDesktop: Story = {
  args: {},
};

PrimaryDesktop.decorators = [StoreDecorator(stateNotificationButton)];

// Dark desktop notification button

export const DarkDesktop: Story = {
  args: {},
};

DarkDesktop.decorators = [
  StoreDecorator(stateNotificationButton),
  ThemeDecorator(Theme.DARK),
];

// Orange desktop notification button

export const OrangeDesktop: Story = {
  args: {},
};

OrangeDesktop.decorators = [
  StoreDecorator(stateNotificationButton),
  ThemeDecorator(Theme.ORANGE),
];

// Primary mobile notification button

export const PrimaryMobile: Story = {
  args: {
    storybookMobile: true,
  },
};

PrimaryMobile.decorators = [StoreDecorator(stateNotificationButton)];

PrimaryMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Dark mobile notification button

export const DarkMobile: Story = {
  args: {
    storybookMobile: true,
  },
};

DarkMobile.decorators = [
  StoreDecorator(stateNotificationButton),
  ThemeDecorator(Theme.DARK),
];

DarkMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Orange mobile notification button

export const OrangeMobile: Story = {
  args: {
    storybookMobile: true,
  },
};

OrangeMobile.decorators = [
  StoreDecorator(stateNotificationButton),
  ThemeDecorator(Theme.ORANGE),
];

OrangeMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

export default meta;
