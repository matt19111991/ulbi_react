import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Tabs } from './Tabs';

const tabs = [
  { content: 'tab 1', value: 'tab 1' },
  { content: 'tab 2', value: 'tab 2' },
  { content: 'tab 3', value: 'tab 3' },
];

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

// Primary tabs

export const Primary: Story = {
  args: {
    onTabClick: action('onTabClick'),
    tabs,
    value: 'tab 2',
  },
};

// Dark tabs

export const Dark: Story = {
  args: {
    onTabClick: action('onTabClick'),
    tabs,
    value: 'tab 2',
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange tabs

export const Orange: Story = {
  args: {
    onTabClick: action('onTabClick'),
    tabs,
    value: 'tab 2',
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
