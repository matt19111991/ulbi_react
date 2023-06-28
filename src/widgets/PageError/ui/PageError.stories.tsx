import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { PageError } from './PageError';

const meta = {
  title: 'widgets/PageError',
  component: PageError,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof PageError>;

type Story = StoryObj<typeof meta>;

// Light page error

export const Light: Story = {
  args: {},
};

// Dark page error

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export default meta;
