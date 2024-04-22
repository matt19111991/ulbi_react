import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Select } from './Select';

const meta = {
  title: 'shared/components/old/Select',
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
    label: 'Выберите пункт',
    onChange: action('onChange'),
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
  },
};

Primary.decorators = [IndentsDecorator];

// Dark select

export const Dark: Story = {
  args: {
    label: 'Выберите пункт',
    onChange: action('onChange'),
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
  },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange select

export const Orange: Story = {
  args: {
    label: 'Выберите пункт',
    onChange: action('onChange'),
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Readonly select

export const ReadOnly: Story = {
  args: {
    label: 'Выберите пункт',
    readOnly: true,
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    value: '456',
  },
};

ReadOnly.decorators = [IndentsDecorator];

export default meta;
