import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { TextArea } from './TextArea';

const meta = {
  title: 'shared/components/new/TextArea',
  component: TextArea,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof TextArea>;

type Story = StoryObj<typeof meta>;

// Primary textarea

export const Primary: Story = {
  args: {
    onChange: action('onChange'),
    value: '12345',
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark textarea

export const Dark: Story = {
  args: {
    onChange: action('onChange'),
    value: '12345',
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange textarea

export const Orange: Story = {
  args: {
    onChange: action('onChange'),
    value: '12345',
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Textarea with auto focus

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    onChange: action('onChange'),
    value: '12345',
  },
};

AutoFocus.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Full width textarea

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    onChange: action('onChange'),
    value: '12345',
  },
};

FullWidth.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Read only textarea

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: '12345',
  },
};

ReadOnly.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Textarea with horizontal label

export const HorizontalLabel: Story = {
  args: {
    label: 'Label',
    onChange: action('onChange'),
    value: '12345',
  },
};

HorizontalLabel.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Textarea with vertical label

export const VerticalLabel: Story = {
  args: {
    label: 'Label',
    onChange: action('onChange'),
    value: '12345',
    verticalLabel: true,
  },
};

VerticalLabel.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Textarea with custom rows

export const CustomRows: Story = {
  args: {
    onChange: action('onChange'),
    rows: 8,
    value: '8 rows',
  },
};

CustomRows.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Textarea with placeholder

export const Placeholder: Story = {
  args: {
    onChange: action('onChange'),
    placeholder: 'Введите текст',
  },
};

Placeholder.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
