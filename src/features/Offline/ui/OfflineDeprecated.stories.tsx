import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Offline } from './Offline';

const meta = {
  title: 'features/Offline/Offline/old',
  component: Offline,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Offline>;

type Story = StoryObj<typeof meta>;

// Primary offline

export const Primary: Story = {
  args: {},
};

// Dark offline

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange offline

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
