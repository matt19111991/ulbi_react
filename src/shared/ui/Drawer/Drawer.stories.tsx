import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { AnimationDecorator } from 'shared/config/storybook/AnimationDecorator/AnimationDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text, TextAlign } from '../Text/Text';

import { Drawer } from './Drawer';

const meta = {
  title: 'shared/Drawer',
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
    children: <Text align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

// Dark drawer

export const Dark: Story = {
  args: {
    children: <Text align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange drawer

export const Orange: Story = {
  args: {
    children: <Text align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
