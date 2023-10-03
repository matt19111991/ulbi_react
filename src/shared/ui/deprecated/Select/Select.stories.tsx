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
    label: 'Укажите значение',
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
    label: 'Укажите значение',
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
    label: 'Укажите значение',
    options: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
