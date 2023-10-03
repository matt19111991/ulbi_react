import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'shared/components/old/Skeleton',
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

NormalPrimary.decorators = [IndentsDecorator];

// Circle primary skeleton

export const CirclePrimary: Story = {
  args: {
    border: '50%',
    height: 100,
    width: 100,
  },
};

CirclePrimary.decorators = [IndentsDecorator];

// Normal dark skeleton

export const NormalDark: Story = {
  args: {
    height: 200,
    width: '100%',
  },
};

NormalDark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Circle dark skeleton

export const CircleDark: Story = {
  args: {
    border: '50%',
    height: 100,
    width: 100,
  },
};

CircleDark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Normal orange skeleton

export const NormalOrange: Story = {
  args: {
    height: 200,
    width: '100%',
  },
};

NormalOrange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Circle orange skeleton

export const CircleOrange: Story = {
  args: {
    border: '50%',
    height: 100,
    width: 100,
  },
};

CircleOrange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
