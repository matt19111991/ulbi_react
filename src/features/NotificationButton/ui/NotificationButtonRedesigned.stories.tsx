import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { NotificationButton } from './NotificationButton';

const RightAlignDecorator = (Story: StoryFn, context: StoryContext) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{Story({}, context)}</div>
);

const meta = {
  title: 'features/Notifications/NotificationButton/new',
  component: NotificationButton,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'lg',
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof NotificationButton>;

type Story = StoryObj<typeof meta>;

// Primary desktop notification button

export const PrimaryDesktop: Story = {
  args: {},
};

PrimaryDesktop.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), RightAlignDecorator];

// Dark desktop notification button

export const DarkDesktop: Story = {
  args: {},
};

DarkDesktop.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  RightAlignDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange desktop notification button

export const OrangeDesktop: Story = {
  args: {},
};

OrangeDesktop.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  RightAlignDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary mobile notification button

export const PrimaryMobile: Story = {
  args: {
    storybookMobile: true,
  },
};

PrimaryMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

PrimaryMobile.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), RightAlignDecorator];

// Dark mobile notification button

export const DarkMobile: Story = {
  args: {
    storybookMobile: true,
  },
};

DarkMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

DarkMobile.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  RightAlignDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange mobile notification button

export const OrangeMobile: Story = {
  args: {
    storybookMobile: true,
  },
};

OrangeMobile.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

OrangeMobile.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  RightAlignDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
