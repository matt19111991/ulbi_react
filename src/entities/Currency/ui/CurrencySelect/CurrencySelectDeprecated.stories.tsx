import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { CurrencySelect } from './CurrencySelect';

const meta = {
  title: 'entities/Currency/CurrencySelect/old',
  component: CurrencySelect,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof CurrencySelect>;

type Story = StoryObj<typeof meta>;

// Primary currency select

export const Primary: Story = {
  args: {
    onChange: action('onChange'),
  },
};

Primary.decorators = [IndentsDecorator];

// Dark currency select

export const Dark: Story = {
  args: {
    onChange: action('onChange'),
  },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange currency select

export const Orange: Story = {
  args: {
    onChange: action('onChange'),
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Currency select with top left direction

export const TopLeft: Story = {
  args: {
    direction: 'top-left',
    onChange: action('onChange'),
  },
};

TopLeft.decorators = [
  IndentsDecorator,
  (Story: ReturnType<StoryFn>) => (
    <div style={{ paddingTop: 108 }}>
      <Story />
    </div>
  ),
];

// Currency select with top right direction

export const TopRight: Story = {
  args: {
    direction: 'top-right',
    onChange: action('onChange'),
  },
};

TopRight.decorators = [
  IndentsDecorator,
  (Story: ReturnType<StoryFn>) => (
    <div style={{ padding: '108px 0 0 24px' }}>
      <Story />
    </div>
  ),
];

// Currency select with bottom left direction

export const BottomLeft: Story = {
  args: {
    direction: 'bottom-left',
    onChange: action('onChange'),
  },
};

BottomLeft.decorators = [IndentsDecorator];

// Currency select with bottom right direction

export const BottomRight: Story = {
  args: {
    direction: 'bottom-right',
    onChange: action('onChange'),
  },
};

BottomRight.decorators = [
  IndentsDecorator,
  (Story: ReturnType<StoryFn>) => (
    <div style={{ paddingLeft: 24 }}>
      <Story />
    </div>
  ),
];

// Read only currency select

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

ReadOnly.decorators = [IndentsDecorator];

export default meta;
