import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { LangSwitcher } from './LangSwitcher';

const stateLangSwitcherRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'features/LangSwitcher',
  component: LangSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof LangSwitcher>;

type Story = StoryObj<typeof meta>;

// Primary lang switcher old

export const PrimaryOld: Story = {
  args: {},
};

// Dark lang switcher old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange lang switcher old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary lang switcher new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateLangSwitcherRedesigned)];

// Dark lang switcher new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateLangSwitcherRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange lang switcher new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateLangSwitcherRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
