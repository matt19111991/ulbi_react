import type { Meta, StoryObj } from '@storybook/react';

import { CurrencySelect } from './CurrencySelect';

const meta = {
  title: 'entities/CurrencySelect',
  component: CurrencySelect,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof CurrencySelect>;

// Primary currency select

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
