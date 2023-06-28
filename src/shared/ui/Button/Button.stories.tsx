import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button, ThemeButton } from './Button';

const meta = {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

// Primary button

export const PrimaryLight: Story = {
  args: {
    children: 'Text',
  },
};

// Clear button

export const ClearLight: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.CLEAR,
  },
};

// Outline light button

export const OutlineLight: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
  },
};

// Outline dark button

export const OutlineDark: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
  },
};

OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]; // добавление декораторов на локальном уровне

export default meta;
