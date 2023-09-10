import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Button } from './Button';

const meta = {
  title: 'shared/new/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

// Primary light button

export const PrimaryLight: Story = {
  args: {
    children: 'Text',
  },
};

// Clear light button

export const ClearLight: Story = {
  args: {
    children: 'Text',
    variant: 'clear',
  },
};

// Outline light button

export const OutlineLight: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
  },
};

// Outline dark button

export const OutlineDark: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
  },
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]; // добавление декораторов на локальном уровне

// Outline large button

export const OutlineLarge: Story = {
  args: {
    children: 'Text',
    size: 'l',
    variant: 'outline',
  },
};

// Outline extra large button

export const OutlineExtraLarge: Story = {
  args: {
    children: 'Text',
    size: 'xl',
    variant: 'outline',
  },
};

// Square medium button

export const SquareMedium: Story = {
  args: {
    children: '>',
    square: true,
    variant: 'clear',
  },
};

// Square large button

export const SquareLarge: Story = {
  args: {
    children: '>',
    size: 'l',
    square: true,
    variant: 'clear',
  },
};

// Square extra large button

export const SquareExtraLarge: Story = {
  args: {
    children: '>',
    size: 'xl',
    square: true,
    variant: 'clear',
  },
};

// Disabled button

export const Disabled: Story = {
  args: {
    children: '>',
    disabled: true,
    variant: 'outline',
  },
};

// Full width button

export const FullWidth: Story = {
  args: {
    children: '>',
    fullWidth: true,
    variant: 'outline',
  },
};

export default meta;
