import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta = {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Select>;

type Story = StoryObj<typeof meta>;

// Primary select

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
  },
};

export default meta;
