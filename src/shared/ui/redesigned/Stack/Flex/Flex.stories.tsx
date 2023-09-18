import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from './Flex';

const meta = {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Flex>;

type Story = StoryObj<typeof meta>;

// Column

export const Column: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
  },
};

// Column Left

export const ColumnLeft: Story = {
  args: {
    align: 'start',
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
  },
};

// Column Right

export const ColumnRight: Story = {
  args: {
    align: 'end',
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
  },
};

// Column gap 4px

export const ColumnGap4: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
    gap: '4',
  },
};

// Column gap 8px

export const ColumnGap8: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
    gap: '8',
  },
};

// Column gap 16px

export const ColumnGap16: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
    gap: '16',
  },
};

// Column gap 24px

export const ColumnGap24: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
    gap: '24',
  },
};

// Column gap 32px

export const ColumnGap32: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    direction: 'column',
    gap: '32',
  },
};

// Row

export const Row: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
  },
};

// Row center

export const RowCenter: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    justify: 'center',
  },
};

// Row right

export const RowRight: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    justify: 'end',
  },
};

// Row gap 4px

export const RowGap4: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    gap: '4',
  },
};

// Row gap 8px

export const RowGap8: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    gap: '8',
  },
};

// Row gap 16px

export const RowGap16: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    gap: '16',
  },
};

// Row gap 32px

export const RowGap32: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
      </>
    ),
    gap: '32',
  },
};

// Nowrap

export const Nowrap: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
        <div>Fifth</div>
        <div>Sixth</div>
        <div>Sevenths</div>
        <div>Eighth</div>
        <div>Ninth</div>
        <div>Tenth</div>
      </>
    ),
    wrap: 'nowrap',
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid black', overflow: 'hidden', padding: 8, width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

// Wrap

export const Wrap: Story = {
  args: {
    children: (
      <>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
        <div>Fourth</div>
        <div>Fifth</div>
        <div>Sixth</div>
        <div>Sevenths</div>
        <div>Eighth</div>
        <div>Ninth</div>
        <div>Tenth</div>
      </>
    ),
    wrap: 'wrap',
  },
  decorators: [
    (Story) => (
      <div style={{ border: '1px solid black', overflow: 'hidden', padding: 8, width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
