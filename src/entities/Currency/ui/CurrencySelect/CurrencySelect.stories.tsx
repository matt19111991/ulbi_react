import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { CurrencySelect } from './CurrencySelect';

const stateCurrencySelectRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'entities/CurrencySelect',
  component: CurrencySelect,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof CurrencySelect>;

type Story = StoryObj<typeof meta>;

// Primary currency select old

export const PrimaryOld: Story = {
  args: {},
};

// Dark currency select old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange currency select old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary currency select new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateCurrencySelectRedesigned)];

// Dark currency select new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateCurrencySelectRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange currency select new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateCurrencySelectRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
