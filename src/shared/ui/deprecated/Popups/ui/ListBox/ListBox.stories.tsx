import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ListBox } from './ListBox';

const meta = {
  title: 'shared/components/old/ListBox',
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

Primary.decorators = [IndentsDecorator];

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

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

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

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

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

ReadOnly.decorators = [IndentsDecorator];

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

DisabledOption.decorators = [IndentsDecorator];

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

DefaultValue.decorators = [IndentsDecorator];

// Bottom left direction list box

export const BottomLeftDirection: Story = {
  args: {
    direction: 'bottom-left',
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    value: '123',
  },
};

BottomLeftDirection.decorators = [IndentsDecorator];

// Bottom right direction list box

export const BottomRightDirection: Story = {
  args: {
    direction: 'bottom-right',
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    value: '123',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px 70px' }}>
        <Story />
      </div>
    ),
  ],
};

// Top left direction list box

export const TopLeftDirection: Story = {
  args: {
    direction: 'top-left',
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    value: '123',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '200px 100px' }}>
        <Story />
      </div>
    ),
  ],
};

// Top right direction list box

export const TopRightDirection: Story = {
  args: {
    direction: 'top-right',
    label: 'Укажите значение',
    items: [
      { content: 'Первый пункт', value: '123' },
      { content: 'Второй пункт', value: '456' },
      { content: 'Третий пункт', value: '789' },
    ],
    value: '123',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '200px 100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
