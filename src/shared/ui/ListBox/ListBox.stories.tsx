import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ListBox } from './ListBox';

const meta = {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ListBox>;

type Story = StoryObj<typeof meta>;

// Primary list box

export const Primary: Story = {
  args: {
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    onChange: action('onChange'),
    value: 'Первый пункт',
  },
};

// Dark list box

export const Dark: Story = {
  args: {
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    onChange: action('onChange'),
    value: 'Первый пункт',
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange list box

export const Orange: Story = {
  args: {
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    onChange: action('onChange'),
    value: 'Первый пункт',
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Read only list box

export const ReadOnly: Story = {
  args: {
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    readonly: true,
    value: 'Первый пункт',
  },
};

// Disabled option list box

export const DisabledOption: Story = {
  args: {
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', disabled: true, value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    onChange: action('onChange'),
    value: 'Первый пункт',
  },
};

// Default value list box

export const DefaultValue: Story = {
  args: {
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    defaultValue: 'Второй пункт',
    onChange: action('onChange'),
  },
};

// Bottom direction list box

export const BottomDirection: Story = {
  args: {
    direction: 'bottom',
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    value: 'Первый пункт',
  },
};

// Top direction list box

export const TopDirection: Story = {
  args: {
    direction: 'top',
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    value: 'Первый пункт',
  },
};

export default meta;
