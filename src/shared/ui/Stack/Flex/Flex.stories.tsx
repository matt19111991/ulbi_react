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

export default meta;
