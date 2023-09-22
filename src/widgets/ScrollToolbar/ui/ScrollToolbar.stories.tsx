import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ScrollToolbar } from './ScrollToolbar';

const meta = {
  title: 'widgets/ScrollToolbar',
  component: ScrollToolbar,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          height: '101vh',
          outline: '1px solid black',
          width: 32,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ScrollToolbar>;

type Story = StoryObj<typeof meta>;

// Primary scroll toolbar

export const Primary: Story = {
  args: {},
};

// Dark scroll toolbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange scroll toolbar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
