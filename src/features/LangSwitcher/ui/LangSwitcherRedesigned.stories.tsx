import type { Meta, StoryObj } from '@storybook/react';

import '@/shared/config/i18n/i18nForStorybook';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { LangSwitcher } from './LangSwitcher';

const meta = {
  title: 'features/Language/LangSwitcher/new',
  component: LangSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof LangSwitcher>;

type Story = StoryObj<typeof meta>;

// Primary lang switcher full

export const PrimaryFull: Story = {
  args: {},
};

PrimaryFull.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark lang switcher full

export const DarkFull: Story = {
  args: {},
};

DarkFull.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Orange lang switcher full

export const OrangeFull: Story = {
  args: {},
};

OrangeFull.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Primary lang switcher short

export const PrimaryShort: Story = {
  args: {
    short: true,
  },
};

PrimaryShort.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark lang switcher short

export const DarkShort: Story = {
  args: {
    short: true,
  },
};

DarkShort.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.DARK),
];

// Orange lang switcher short

export const OrangeShort: Story = {
  args: {
    short: true,
  },
};

OrangeShort.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
