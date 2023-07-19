import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Loader } from './Loader';

const meta = {
  title: 'shared/Loader',
  component: Loader,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Loader>;

type Story = StoryObj<typeof meta>;

// Primary loader

export const Primary: Story = {
  args: {},
};

// Dark loader

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange loader

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
