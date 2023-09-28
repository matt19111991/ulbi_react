import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { TextArea } from './TextArea';

const TableCellDecorator = (Story: StoryFn) => (
  <div style={{ display: 'table-cell' }}>
    <Story />
  </div>
);

const meta = {
  title: 'shared/new/TextArea',
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

Primary.decorators = [TableCellDecorator];

// Dark textarea

export const Dark: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Dark.decorators = [TableCellDecorator, ThemeDecorator(Theme.DARK)];

// Orange textarea

export const Orange: Story = {
  args: {
    placeholder: 'Type text',
    value: '12345',
  },
};

Orange.decorators = [TableCellDecorator, ThemeDecorator(Theme.ORANGE)];

// Textarea with auto focus

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    value: '12345',
  },
};

AutoFocus.decorators = [TableCellDecorator];

// Full width textarea

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    value: '12345',
  },
};

// Read only textarea

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: '12345',
  },
};

ReadOnly.decorators = [TableCellDecorator];

// Textarea with horizontal label

export const HorizontalLabel: Story = {
  args: {
    label: 'Input',
    value: '12345',
  },
};

HorizontalLabel.decorators = [TableCellDecorator];

// Textarea with vertical label

export const VerticalLabel: Story = {
  args: {
    label: 'Input',
    value: '12345',
    verticalLabel: true,
  },
};

VerticalLabel.decorators = [TableCellDecorator];

export default meta;
