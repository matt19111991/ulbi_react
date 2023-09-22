import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { AppLoaderLayout } from './AppLoaderLayout';

const meta = {
  title: 'shared/layouts/AppLoaderLayout',
  component: AppLoaderLayout,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AppLoaderLayout>;

type Story = StoryObj<typeof meta>;

// Primary app loader layout

export const Primary: Story = {
  args: {},
};

// Dark app loader layout

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange app loader layout

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
