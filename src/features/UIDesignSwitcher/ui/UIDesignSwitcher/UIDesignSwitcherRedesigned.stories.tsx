import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { UIDesignSwitcher } from './UIDesignSwitcher';

const meta = {
  title: 'features/Settings/UIDesignSwitcher/new',
  component: UIDesignSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof UIDesignSwitcher>;

type Story = StoryObj<typeof meta>;

// Primary UI design switcher

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark UI design switcher

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange UI design switcher

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Loading primary UI design switcher

export const PrimaryLoading: Story = {
  args: {
    storybookLoading: true,
  },
};

PrimaryLoading.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Loading dark UI design switcher

export const DarkLoading: Story = {
  args: {
    storybookLoading: true,
  },
};

DarkLoading.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Loading orange UI design switcher

export const OrangeLoading: Story = {
  args: {
    storybookLoading: true,
  },
};

OrangeLoading.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
