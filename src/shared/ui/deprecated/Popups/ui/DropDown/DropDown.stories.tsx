import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { DropDown } from './DropDown';

const Trigger = () => (
  <p
    style={{
      border: '1px solid var(--primary-color)',
      color: 'var(--primary-color)',
      padding: '4px 8px',
    }}
  >
    Open
  </p>
);

const meta = {
  title: 'shared/components/old/DropDown',
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

Primary.decorators = [IndentsDecorator];

// Dark dropdown

export const Dark: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange dropdown

export const Orange: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Top-left dropdown

export const TopLeft: Story = {
  args: {
    direction: 'top-left',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

TopLeft.decorators = [
  (Story) => (
    <div style={{ padding: '120px 20px' }}>
      <Story />
    </div>
  ),
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
  (Story) => (
    <div style={{ display: 'flex', padding: '120px 90px' }}>
      <Story />
    </div>
  ),
];

// Bottom-left dropdown

export const BottomLeft: Story = {
  args: {
    direction: 'bottom-left',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

BottomLeft.decorators = [IndentsDecorator];

// Bottom-right dropdown

export const BottomRight: Story = {
  args: {
    direction: 'bottom-right',
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    trigger: <Trigger />,
  },
};

BottomRight.decorators = [
  (Story) => (
    <div style={{ display: 'flex', padding: '0 70px' }}>
      <Story />
    </div>
  ),
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

JustifyLeft.decorators = [IndentsDecorator];

// Justify center dropdown

export const JustifyCenter: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'center',
    trigger: <Trigger />,
  },
};

JustifyCenter.decorators = [IndentsDecorator];

// Justify right dropdown

export const JustifyRight: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    justify: 'right',
    trigger: <Trigger />,
  },
};

JustifyRight.decorators = [IndentsDecorator];

export const Small: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    optionSize: 'S',
    trigger: <Trigger />,
  },
};

Small.decorators = [IndentsDecorator];

// Medium dropdown

export const Medium: Story = {
  args: {
    items: [{ content: 'First item' }, { content: 'Second item' }, { content: 'Third item' }],
    optionSize: 'M',
    trigger: <Trigger />,
  },
};

Medium.decorators = [IndentsDecorator];

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

Disabled.decorators = [IndentsDecorator];

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

Clickable.decorators = [IndentsDecorator];

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

Link.decorators = [IndentsDecorator];

export default meta;
