import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Button } from '../../../Button/Button';

import { DropDown } from './DropDown';

const meta = {
  title: 'shared/components/new/DropDown',
  component: DropDown,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof DropDown>;

type Story = StoryObj<typeof meta>;

// Primary dropdown

export const Primary: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Button>Open</Button>,
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark dropdown

export const Dark: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Button>Open</Button>,
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange dropdown

export const Orange: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Button>Open</Button>,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Top-left dropdown

export const TopLeft: Story = {
  args: {
    direction: 'top-left',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Button>Open</Button>,
  },
};

TopLeft.decorators = [
  (Story) => (
    <div style={{ padding: '150px 20px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
];

// Top-right dropdown

export const TopRight: Story = {
  args: {
    direction: 'top-right',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Button>Open</Button>,
  },
};

TopRight.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '150px 70px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
];

// Bottom-left dropdown

export const BottomLeft: Story = {
  args: {
    direction: 'bottom-left',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Button>Open</Button>,
  },
};

BottomLeft.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Bottom-right dropdown

export const BottomRight: Story = {
  args: {
    direction: 'bottom-right',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Button>Open</Button>,
  },
};

BottomRight.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '0 70px' }}>
      <Story />
    </div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Justify left dropdown

export const JustifyLeft: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'left',
    trigger: <Button>Open</Button>,
  },
};

JustifyLeft.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Justify center dropdown

export const JustifyCenter: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'center',
    trigger: <Button>Open</Button>,
  },
};

JustifyCenter.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Justify right dropdown

export const JustifyRight: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'right',
    trigger: <Button>Open</Button>,
  },
};

JustifyRight.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Small dropdown

export const Small: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    optionSize: 'S',
    trigger: <Button>Open</Button>,
  },
};

Small.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Medium dropdown

export const Medium: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    optionSize: 'M',
    trigger: <Button>Open</Button>,
  },
};

Medium.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
