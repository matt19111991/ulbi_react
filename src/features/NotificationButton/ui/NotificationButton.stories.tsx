import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { NotificationButton } from './NotificationButton';

const meta = {
  title: 'features/Notifications/NotificationButton',
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

// Primary desktop notification button old

export const PrimaryDesktopOld: Story = {
  args: {},
};

// Dark desktop notification button old

export const DarkDesktopOld: Story = {
  args: {},
};

DarkDesktopOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange desktop notification button old

export const OrangeDesktopOld: Story = {
  args: {},
};

OrangeDesktopOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary mobile notification button old

export const PrimaryMobileOld: Story = {
  args: {
    storybookMobile: true,
  },
};

PrimaryMobileOld.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Dark mobile notification button old

export const DarkMobileOld: Story = {
  args: {
    storybookMobile: true,
  },
};

DarkMobileOld.decorators = [ThemeDecorator(Theme.DARK)];

DarkMobileOld.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Orange mobile notification button old

export const OrangeMobileOld: Story = {
  args: {
    storybookMobile: true,
  },
};

OrangeMobileOld.decorators = [ThemeDecorator(Theme.ORANGE)];

OrangeMobileOld.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Primary desktop notification button new

export const PrimaryDesktopNew: Story = {
  args: {},
};

PrimaryDesktopNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark desktop notification button new

export const DarkDesktopNew: Story = {
  args: {},
};

DarkDesktopNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Orange desktop notification button new

export const OrangeDesktopNew: Story = {
  args: {},
};

OrangeDesktopNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Primary mobile notification button new

export const PrimaryMobileNew: Story = {
  args: {
    storybookMobile: true,
  },
};

PrimaryMobileNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

PrimaryMobileNew.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Dark mobile notification button new

export const DarkMobileNew: Story = {
  args: {
    storybookMobile: true,
  },
};

DarkMobileNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

DarkMobileNew.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

// Orange mobile notification button new

export const OrangeMobileNew: Story = {
  args: {
    storybookMobile: true,
  },
};

OrangeMobileNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

OrangeMobileNew.parameters = {
  viewport: {
    defaultViewport: 'iphone6',
  },
};

export default meta;
