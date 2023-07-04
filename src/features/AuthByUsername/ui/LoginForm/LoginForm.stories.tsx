import type { Meta, StoryObj } from '@storybook/react';

import { LoginForm } from './LoginForm';

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof LoginForm>;

type Story = StoryObj<typeof meta>;

// Primary Login Form

export const Primary: Story = {
  args: {},
};

export default meta;
