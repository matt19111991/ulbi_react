import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { ViewportMap } from '@storybook/addon-viewport';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import type { StateSchema } from '@/app/providers/StoreProvider';

import { userReducer } from '@/entities/User/testing';

import '@/shared/config/i18n/i18nForStorybook';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { Sidebar } from './Sidebar';

const customViewPorts: ViewportMap = {
  '1080p': {
    name: '1080p',
    styles: {
      height: '420px',
      width: '1920px',
    },
    type: 'desktop',
  },
};

const asyncReducers: ReducersList = {
  user: userReducer,
};

const stateAuthorized: DeepPartial<StateSchema> = {
  user: {
    authData: {},
  },
};

const meta = {
  title: 'widgets/Sidebar/Sidebar/new',
  component: Sidebar,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  parameters: {
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...customViewPorts,
      },
    },
  },
} as Meta<typeof Sidebar>;

type Story = StoryObj<typeof meta>;

const FullHeightDecorator = (Story: ReturnType<StoryFn>) => (
  <div style={{ display: 'grid' }}>
    <Story />
  </div>
);

// Primary sidebar large

export const PrimaryLarge: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: '1080p',
    },
  },
};

PrimaryLarge.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
];

// Dark sidebar large

export const DarkLarge: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: '1080p',
    },
  },
};

DarkLarge.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar large

export const OrangeLarge: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: '1080p',
    },
  },
};

OrangeLarge.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Unauthorized sidebar large

export const UnauthorizedLarge: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: '1080p',
    },
  },
};

UnauthorizedLarge.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
];

// Primary sidebar medium

export const PrimaryMedium: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad12p',
    },
  },
};

PrimaryMedium.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
];

// Dark sidebar medium

export const DarkMedium: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad12p',
    },
  },
};

DarkMedium.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar medium

export const OrangeMedium: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad12p',
    },
  },
};

OrangeMedium.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Unauthorized sidebar medium

export const UnauthorizedMedium: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'ipad12p',
    },
  },
};

UnauthorizedMedium.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
];

// Primary sidebar small

export const PrimarySmall: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

PrimarySmall.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
];

// Dark sidebar small

export const DarkSmall: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

DarkSmall.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar small

export const OrangeSmall: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

OrangeSmall.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  StoreDecorator(stateAuthorized, asyncReducers),
  ThemeDecorator(Theme.ORANGE),
];

// Unauthorized sidebar small

export const UnauthorizedSmall: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

UnauthorizedSmall.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
];

export default meta;
