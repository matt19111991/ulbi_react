import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

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
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
  },
};

// Dark select

export const Dark: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange select

export const Orange: Story = {
  args: {
    label: 'Укажите значение',
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
