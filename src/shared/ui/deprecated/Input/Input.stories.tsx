import { action } from 'storybook/actions';
import type { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Input } from './Input';

const meta = {
  title: 'shared/components/old/Input',
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
    onChange: action('onChange'),
    placeholder: 'Type text',
    value: '12345',
  },
};

// Dark input

export const Dark: Story = {
  args: {
    onChange: action('onChange'),
    placeholder: 'Type text',
    value: '12345',
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange input

export const Orange: Story = {
  args: {
    onChange: action('onChange'),
    placeholder: 'Type text',
    value: '12345',
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Input with auto focus

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    onChange: action('onChange'),
    value: '12345',
  },
};

// Full width input

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    onChange: action('onChange'),
    value: '12345',
  },
};

FullWidth.decorators = [
  (Story: StoryFn, context: StoryContext) => (
    <div style={{ border: '1px solid black', padding: 16 }}>{Story({}, context)}</div>
  ),
];

// Input with placeholder

export const Placeholder: Story = {
  args: {
    onChange: action('onChange'),
    placeholder: 'Введите значение',
  },
};

// Read only input

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: '12345',
  },
};

export default meta;
