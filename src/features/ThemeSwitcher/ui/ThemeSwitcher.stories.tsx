import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ThemeSwitcher } from './ThemeSwitcher';

const stateThemeSwitcherRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ThemeSwitcher>;

type Story = StoryObj<typeof meta>;

// Primary theme switcher old

export const PrimaryOld: Story = {
  args: {},
};

// Dark theme switcher old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange theme switcher old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary theme switcher new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateThemeSwitcherRedesigned)];

// Dark theme switcher new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateThemeSwitcherRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange theme switcher new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateThemeSwitcherRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
