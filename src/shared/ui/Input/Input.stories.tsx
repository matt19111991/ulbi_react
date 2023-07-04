import type { Meta, StoryObj } from '@storybook/react';

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

// Primary Input

export const PrimaryInput: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

export default meta;
