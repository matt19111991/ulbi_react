import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import IconSvg from '@/shared/assets/tests/storybook3.svg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Input } from './Input';

const ColoredDecorator = (Story: StoryFn) => (
  <div style={{ color: 'var(--icon-redesigned)' }}>
    <Story />
  </div>
);

const meta = {
  title: 'shared/components/new/Input',
  component: Input,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

// Primary input

export const Primary: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Primary.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Dark input

export const Dark: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Dark.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange input

export const Orange: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Orange.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Input with auto focus

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    value: '12345',
  },
};

AutoFocus.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Full width input

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    value: '12345',
  },
};

FullWidth.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Read only input

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: '12345',
  },
};

ReadOnly.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Input with addon left

export const AddonLeft: Story = {
  args: {
    addonLeft: (
      <div style={{ alignItems: 'center', display: 'flex', margin: '0 8px 2px 0' }}>
        <IconSvg />
      </div>
    ),
    value: '12345',
  },
};

AddonLeft.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Input with addon right

export const AddonRight: Story = {
  args: {
    addonRight: (
      <div style={{ alignItems: 'center', display: 'flex', marginBottom: 2 }}>
        <IconSvg />
      </div>
    ),
    value: '12345',
  },
};

AddonRight.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Input with horizontal label

export const HorizontalLabel: Story = {
  args: {
    label: 'Input',
    value: '12345',
  },
};

HorizontalLabel.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Input with vertical label

export const VerticalLabel: Story = {
  args: {
    label: 'Input',
    value: '12345',
    verticalLabel: true,
  },
};

VerticalLabel.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Small input

export const Small: Story = {
  args: {
    size: 's',
    value: '12345',
  },
};

Small.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Large input

export const Large: Story = {
  args: {
    size: 'l',
    value: '12345',
  },
};

Large.decorators = [
  ColoredDecorator,
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

export default meta;
