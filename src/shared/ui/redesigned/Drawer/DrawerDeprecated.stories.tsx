import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { AnimationDecorator } from '@/shared/config/storybook/AnimationDecorator/AnimationDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Drawer } from './Drawer';

const Content = () => <p style={{ fontSize: 24, textAlign: 'center' }}>Drawer content</p>;

const meta = {
  title: 'shared/components/old/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Drawer>;

type Story = StoryObj<typeof meta>;

// Primary drawer

export const Primary: Story = {
  args: {
    children: <Content />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Primary.decorators = [AnimationDecorator];

// Dark drawer

export const Dark: Story = {
  args: {
    children: <Content />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Dark.decorators = [AnimationDecorator, ThemeDecorator(Theme.DARK)];

// Orange drawer

export const Orange: Story = {
  args: {
    children: <Content />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

Orange.decorators = [AnimationDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
