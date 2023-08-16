import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Input } from './Input';

const meta = {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

// Primary input

export const Primary: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

// Dark input

export const Dark: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange input

export const Orange: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
