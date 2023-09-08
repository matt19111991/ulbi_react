import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Button } from '../../../Button/Button';

import { Popover } from './Popover';

const meta = {
  title: 'shared/Popover',
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
    trigger: <Button>Open</Button>,
  },
};

// Dark popover

export const Dark: Story = {
  args: {
    children: <p>Test</p>,
    trigger: <Button>Open</Button>,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange popover

export const Orange: Story = {
  args: {
    children: <p>Test</p>,
    trigger: <Button>Open</Button>,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Bottom left direction popover

export const BottomLeftDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'bottom-left',
    trigger: <Button>Open</Button>,
  },
};

// Bottom right direction popover

export const BottomRightDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'bottom-right',
    trigger: <Button>Open</Button>,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', padding: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

// Top left direction popover

export const TopLeftDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'top-left',
    trigger: <Button>Open</Button>,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', padding: '40px 8px' }}>
        <Story />
      </div>
    ),
  ],
};

// Top right direction popover

export const TopRightDirection: Story = {
  args: {
    children: <p>Test</p>,
    direction: 'top-right',
    trigger: <Button>Open</Button>,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', padding: '40px 8px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
