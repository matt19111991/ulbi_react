import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button, ButtonSize, ButtonTheme } from './Button';

const meta = {
  title: 'shared/Button',
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
    theme: ButtonTheme.CLEAR,
  },
};

// Clear inverted button

export const ClearInverted: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.CLEAR_INVERTED,
  },
};

// Outline light button

export const OutlineLight: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
  },
};

// Outline dark button

export const OutlineDark: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
  },
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]; // добавление декораторов на локальном уровне

// Outline large button

export const OutlineLarge: Story = {
  args: {
    children: 'Text',
    size: ButtonSize.L,
    theme: ButtonTheme.OUTLINE,
  },
};

// Outline extra large button

export const OutlineExtraLarge: Story = {
  args: {
    children: 'Text',
    size: ButtonSize.XL,
    theme: ButtonTheme.OUTLINE,
  },
};

// Background theme button

export const BackgroundTheme: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND,
  },
};

// Background inverted theme button

export const BackgroundInvertedTheme: Story = {
  args: {
    children: 'Text',
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};

// Square medium button

export const SquareMedium: Story = {
  args: {
    children: '>',
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};

// Square large button

export const SquareLarge: Story = {
  args: {
    children: '>',
    size: ButtonSize.L,
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};

// Square extra large button

export const SquareExtraLarge: Story = {
  args: {
    children: '>',
    size: ButtonSize.XL,
    square: true,
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};

// Disabled button

export const Disabled: Story = {
  args: {
    children: '>',
    disabled: true,
    theme: ButtonTheme.OUTLINE,
  },
};

export default meta;
