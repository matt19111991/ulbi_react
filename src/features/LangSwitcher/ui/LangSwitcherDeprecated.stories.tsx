import type { Meta, StoryObj } from '@storybook/react';

import '@/shared/config/i18n/i18nForStorybook';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { LangSwitcher } from './LangSwitcher';

const meta = {
  title: 'features/Language/LangSwitcher/old',
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

// Dark lang switcher full

export const DarkFull: Story = {
  args: {},
};

DarkFull.decorators = [ThemeDecorator(Theme.DARK)];

// Orange lang switcher full

export const OrangeFull: Story = {
  args: {},
};

OrangeFull.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary lang switcher short

export const PrimaryShort: Story = {
  args: {
    short: true,
  },
};

// Dark lang switcher short

export const DarkShort: Story = {
  args: {
    short: true,
  },
};

DarkShort.decorators = [ThemeDecorator(Theme.DARK)];

// Orange lang switcher short

export const OrangeShort: Story = {
  args: {
    short: true,
  },
};

OrangeShort.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
