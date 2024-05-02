import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { UIDesignSwitcher } from './UIDesignSwitcher';

const meta = {
  title: 'features/Settings/UIDesignSwitcher/old',
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

Primary.decorators = [IndentsDecorator];

// Dark UI design switcher

export const Dark: Story = {
  args: {},
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange UI design switcher

export const Orange: Story = {
  args: {},
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Loading primary UI design switcher

export const PrimaryLoading: Story = {
  args: {
    storybookLoading: true,
  },
};

PrimaryLoading.decorators = [IndentsDecorator];

// Loading dark UI design switcher

export const DarkLoading: Story = {
  args: {
    storybookLoading: true,
  },
};

DarkLoading.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Loading orange UI design switcher

export const OrangeLoading: Story = {
  args: {
    storybookLoading: true,
  },
};

OrangeLoading.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
