import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
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
    placeholder: 'Type text',
    value: '12345',
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark textarea

export const Dark: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange textarea

export const Orange: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Textarea with auto focus

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    value: '12345',
  },
};

AutoFocus.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Full width textarea

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    value: '12345',
  },
};

FullWidth.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Read only textarea

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: '12345',
  },
};

ReadOnly.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Textarea with horizontal label

export const HorizontalLabel: Story = {
  args: {
    label: 'Input',
    value: '12345',
  },
};

HorizontalLabel.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Textarea with vertical label

export const VerticalLabel: Story = {
  args: {
    label: 'Input',
    value: '12345',
    verticalLabel: true,
  },
};

VerticalLabel.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

export default meta;
