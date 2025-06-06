import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Button, ButtonSize, ButtonTheme } from './Button';

const meta = {
  title: 'shared/components/old/Button',
  component: Button,
  args: {
    onClick: action('onClick'),
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

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
    children: 'Text',
    disabled: true,
    theme: ButtonTheme.OUTLINE,
  },
};

// Full width button

export const FullWidth: Story = {
  args: {
    children: 'Text',
    fullWidth: true,
    theme: ButtonTheme.OUTLINE,
  },
};

export default meta;
