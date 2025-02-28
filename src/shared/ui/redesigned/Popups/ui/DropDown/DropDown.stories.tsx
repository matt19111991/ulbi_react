import { action } from '@storybook/addon-actions';
import type { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { DropDown } from './DropDown';

const Trigger = () => (
  <p
    style={{
      border: '2px solid var(--accent-redesigned)',
      borderRadius: 16,
      color: 'var(--text-redesigned)',
      padding: '4px 8px',
    }}
  >
    Open
  </p>
);

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
    trigger: <Trigger />,
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark dropdown

export const Dark: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
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
    trigger: <Trigger />,
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
    trigger: <Trigger />,
  },
};

TopLeft.decorators = [
  (Story: StoryFn, context: StoryContext) => (
    <div style={{ padding: '150px 20px' }}>{Story({}, context)}</div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
];

// Top-right dropdown

export const TopRight: Story = {
  args: {
    direction: 'top-right',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

TopRight.decorators = [
  (Story: StoryFn, context: StoryContext) => (
    <div style={{ display: 'flex', padding: '150px 90px' }}>{Story({}, context)}</div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
];

// Bottom-left dropdown

export const BottomLeft: Story = {
  args: {
    direction: 'bottom-left',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

BottomLeft.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Bottom-right dropdown

export const BottomRight: Story = {
  args: {
    direction: 'bottom-right',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

BottomRight.decorators = [
  (Story: StoryFn, context: StoryContext) => (
    <div style={{ display: 'flex', padding: '0 90px' }}>{Story({}, context)}</div>
  ),
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
];

// Justify left dropdown

export const JustifyLeft: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'left',
    trigger: <Trigger />,
  },
};

JustifyLeft.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Justify center dropdown

export const JustifyCenter: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'center',
    trigger: <Trigger />,
  },
};

JustifyCenter.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Justify right dropdown

export const JustifyRight: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'right',
    trigger: <Trigger />,
  },
};

JustifyRight.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Small dropdown

export const Small: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    optionSize: 'S',
    trigger: <Trigger />,
  },
};

Small.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Medium dropdown

export const Medium: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    optionSize: 'M',
    trigger: <Trigger />,
  },
};

Medium.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Disabled

export const Disabled: Story = {
  args: {
    items: [
      { content: 'First item' },
      { content: 'Disabled item', disabled: true },
      { content: 'Third item' },
    ],
    trigger: <Trigger />,
  },
};

Disabled.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Clickable

export const Clickable: Story = {
  args: {
    items: [
      { content: 'First item' },
      { content: 'Clickable item', onClick: action('onClick') },
      { content: 'Third item' },
    ],
    trigger: <Trigger />,
  },
};

Clickable.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Link

export const Link: Story = {
  args: {
    items: [
      { content: 'First item' },
      { content: 'Link item', href: 'test' },
      { content: 'Third item' },
    ],
    trigger: <Trigger />,
  },
};

Link.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

export default meta;
