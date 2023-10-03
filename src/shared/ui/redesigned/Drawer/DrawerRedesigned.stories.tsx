import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { AnimationDecorator } from '@/shared/config/storybook/AnimationDecorator/AnimationDecorator';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Text } from '../Text';

import { Drawer } from './Drawer';

const meta = {
  title: 'shared/components/new/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [AnimationDecorator],
} as Meta<typeof Drawer>;

type Story = StoryObj<typeof meta>;

// Primary drawer

export const Primary: Story = {
  args: {
    children: <Text align='center' title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark drawer

export const Dark: Story = {
  args: {
    children: <Text align='center' title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange drawer

export const Orange: Story = {
  args: {
    children: <Text align='center' title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
