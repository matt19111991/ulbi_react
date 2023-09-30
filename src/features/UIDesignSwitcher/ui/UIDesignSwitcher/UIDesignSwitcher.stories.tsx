import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { UIDesignSwitcher } from './UIDesignSwitcher';

const meta = {
  title: 'features/Theme/UIDesignSwitcher',
  component: UIDesignSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof UIDesignSwitcher>;

type Story = StoryObj<typeof meta>;

// Primary UI design switcher

export const Primary: Story = {
  args: {},
};

// Dark UI design switcher

export const Dark: Story = {
  args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange UI design switcher

export const Orange: Story = {
  args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
