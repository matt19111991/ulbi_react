import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { LangSwitcher } from './LangSwitcher';

const meta = {
  title: 'shared/LangSwitcher',
  component: LangSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof LangSwitcher>;

type Story = StoryObj<typeof meta>;

// Primary lang switcher

export const Primary: Story = {
  args: {},
};

// Dark lang switcher

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange lang switcher

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
