import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Skeleton>;

type Story = StoryObj<typeof meta>;

// Normal light skeleton

export const NormalLight: Story = {
  args: {
    height: 200,
    width: '100%',
  },
};

// Circle light skeleton

export const CircleLight: Story = {
  args: {
    border: '50%',
    height: 100,
    width: 100,
  },
};

// Normal dark skeleton

export const NormalDark: Story = {
  args: {
    height: 200,
    width: '100%',
  },
};

NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

// Circle dark skeleton

export const CircleDark: Story = {
  args: {
    border: '50%',
    height: 100,
    width: 100,
  },
};

CircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export default meta;
