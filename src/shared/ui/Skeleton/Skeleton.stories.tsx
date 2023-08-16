import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

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

// Normal primary skeleton

export const NormalPrimary: Story = {
  args: {
    height: 200,
    width: '100%',
  },
};

// Circle primary skeleton

export const CirclePrimary: Story = {
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

// Normal orange skeleton

export const NormalOrange: Story = {
  args: {
    height: 200,
    width: '100%',
  },
};

NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Circle orange skeleton

export const CircleOrange: Story = {
  args: {
    border: '50%',
    height: 100,
    width: 100,
  },
};

CircleOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
