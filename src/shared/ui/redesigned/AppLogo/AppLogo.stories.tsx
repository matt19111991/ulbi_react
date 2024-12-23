import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { AppLogo } from './AppLogo';

const meta = {
  title: 'shared/components/new/AppLogo',
  component: AppLogo,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AppLogo>;

type Story = StoryObj<typeof meta>;

const LogoDecorator = (Story: ReturnType<StoryFn>) => (
  <div style={{ fill: 'var(--icon-redesigned)' }}>
    <Story />
  </div>
);

// Primary app logo

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), LogoDecorator];

// Dark app logo

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  LogoDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange app logo

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  LogoDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary custom size app logo

export const PrimaryCustomSize: Story = {
  args: {
    size: 120,
  },
};

PrimaryCustomSize.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), LogoDecorator];

// Dark custom size app logo

export const DarkCustomSize: Story = {
  args: {
    size: 120,
  },
};

DarkCustomSize.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  LogoDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange custom size app logo

export const OrangeCustomSize: Story = {
  args: {
    size: 120,
  },
};

OrangeCustomSize.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  LogoDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
