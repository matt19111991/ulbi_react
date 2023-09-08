import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { AppLogo } from './AppLogo';

const meta = {
  title: 'shared/AppLogo',
  component: AppLogo,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fill: 'var(--icon-redesigned)', height: 120, width: 120 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof AppLogo>;

type Story = StoryObj<typeof meta>;

// Primary app logo

export const Primary: Story = {
  args: {},
};

// Dark app logo

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange app logo

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
