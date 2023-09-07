import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { MainLayout } from './MainLayout';

const meta = {
  title: 'shared/MainLayout',
  component: MainLayout,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof MainLayout>;

type Story = StoryObj<typeof meta>;

// Primary main layout

export const Primary: Story = {
  args: {},
};

// Dark main layout

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange main layout

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
