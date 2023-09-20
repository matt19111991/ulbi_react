import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import { AnimationDecorator } from '@/shared/config/storybook/AnimationDecorator/AnimationDecorator';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Text as TextDeprecated, TextAlign } from '../../deprecated/Text/Text';

import { Text as TextRedesigned } from '../Text';

import { Drawer } from './Drawer';

const stateDrawerRedesigned: DeepPartial<StateSchema> = redesignState;

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

// Primary drawer old

export const PrimaryOld: Story = {
  args: {
    children: <TextDeprecated align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

// Dark drawer old

export const DarkOld: Story = {
  args: {
    children: <TextDeprecated align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange drawer old

export const OrangeOld: Story = {
  args: {
    children: <TextDeprecated align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary drawer new

export const PrimaryNew: Story = {
  args: {
    children: <TextRedesigned align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateDrawerRedesigned)];

// Dark drawer new

export const DarkNew: Story = {
  args: {
    children: <TextRedesigned align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateDrawerRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange drawer new

export const OrangeNew: Story = {
  args: {
    children: <TextRedesigned align={TextAlign.CENTER} title='Drawer content' />,
    isOpen: true,
    onClose: action('onClose'),
  },
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateDrawerRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;