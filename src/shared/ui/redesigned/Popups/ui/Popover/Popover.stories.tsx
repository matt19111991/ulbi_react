import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Popover } from './Popover';

const Trigger = () => (
  <p
    style={{
      alignItems: 'center',
      border: '1px solid var(--accent-redesigned)',
      borderRadius: 8,
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      width: 75,
    }}
  >
    Open
  </p>
);

const meta = {
  title: 'shared/components/new/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Popover>;

type Story = StoryObj<typeof meta>;

// Primary popover

export const Primary: Story = {
  args: {
    children: <p>Test</p>,
    trigger: <Trigger />,
  },
};

Primary.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '16px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Dark popover

export const Dark: Story = {
  args: {
    children: <p>Test</p>,
    trigger: <Trigger />,
  },
};

Dark.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '16px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange popover

export const Orange: Story = {
  args: {
    children: <p>Test</p>,
    trigger: <Trigger />,
  },
};

Orange.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '16px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Bottom left direction popover

export const BottomLeftDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'bottom-left',
    trigger: <Trigger />,
  },
};

BottomLeftDirection.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '16px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Bottom right direction popover

export const BottomRightDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'bottom-right',
    trigger: <Trigger />,
  },
};

BottomRightDirection.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '16px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Top left direction popover

export const TopLeftDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'top-left',
    trigger: <Trigger />,
  },
};

TopLeftDirection.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '60px 16px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Top right direction popover

export const TopRightDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'top-right',
    trigger: <Trigger />,
  },
};

TopRightDirection.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '60px 16px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

export default meta;
