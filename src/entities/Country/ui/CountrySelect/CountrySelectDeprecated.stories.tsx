import { action } from 'storybook/actions';
import type { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { CountrySelect } from './CountrySelect';

const meta = {
  title: 'entities/Country/CountrySelect/old',
  component: CountrySelect,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof CountrySelect>;

type Story = StoryObj<typeof meta>;

// Primary country select

export const Primary: Story = {
  args: {
    onChange: action('onChange'),
  },
};

Primary.decorators = [IndentsDecorator];

// Dark country select

export const Dark: Story = {
  args: {
    onChange: action('onChange'),
  },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange country select

export const Orange: Story = {
  args: {
    onChange: action('onChange'),
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Country select with top left direction

export const TopLeft: Story = {
  args: {
    direction: 'top-left',
    onChange: action('onChange'),
  },
};

TopLeft.decorators = [
  IndentsDecorator,
  (Story: StoryFn, context: StoryContext) => (
    <div style={{ paddingTop: 196 }}>{Story({}, context)}</div>
  ),
];

// Country select with top right direction

export const TopRight: Story = {
  args: {
    direction: 'top-right',
    onChange: action('onChange'),
  },
};

TopRight.decorators = [
  IndentsDecorator,
  (Story: StoryFn, context: StoryContext) => (
    <div style={{ padding: '196px 0 0 24px' }}>{Story({}, context)}</div>
  ),
];

// Country select with bottom left direction

export const BottomLeft: Story = {
  args: {
    direction: 'bottom-left',
    onChange: action('onChange'),
  },
};

BottomLeft.decorators = [IndentsDecorator];

// Country select with bottom right direction

export const BottomRight: Story = {
  args: {
    direction: 'bottom-right',
    onChange: action('onChange'),
  },
};

BottomRight.decorators = [
  IndentsDecorator,
  (Story: StoryFn, context: StoryContext) => (
    <div style={{ paddingLeft: 24 }}>{Story({}, context)}</div>
  ),
];

// Read only country select

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

ReadOnly.decorators = [IndentsDecorator];

export default meta;
