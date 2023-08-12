import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'widgets/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof meta>;

// Primary theme switcher

export const Primary: Story = {
  args: {},
};

// Dark theme switcher

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange theme switcher

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
