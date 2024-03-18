import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Popover } from './Popover';

const Trigger = () => (
  <p
    style={{
      border: '1px solid var(--primary-color)',
      color: 'var(--primary-color)',
      height: 38,
      padding: '6px 8px',
      textAlign: 'center',
      width: 66,
    }}
  >
    Open
  </p>
);

const meta = {
  title: 'shared/components/old/Popover',
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

Primary.decorators = [IndentsDecorator];

// Dark popover

export const Dark: Story = {
  args: {
    children: <p>Test</p>,
    trigger: <Trigger />,
  },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange popover

export const Orange: Story = {
  args: {
    children: <p>Test</p>,
    trigger: <Trigger />,
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Bottom left direction popover

export const BottomLeftDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'bottom-left',
    trigger: <Trigger />,
  },
};

BottomLeftDirection.decorators = [IndentsDecorator];

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
    <div style={{ display: 'flex' }}>
      <Story />
    </div>
  ),
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
    <div style={{ display: 'flex', padding: '60px 8px' }}>
      <Story />
    </div>
  ),
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
    <div style={{ display: 'flex', padding: '60px 8px' }}>
      <Story />
    </div>
  ),
];

export default meta;
