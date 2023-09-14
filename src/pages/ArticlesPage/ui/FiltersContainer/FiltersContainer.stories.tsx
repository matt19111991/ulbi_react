import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { FiltersContainer } from './FiltersContainer';

const stateViewSelectorContainerRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'pages/ArticlesPage/ViewSelectorContainer',
  component: FiltersContainer,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof FiltersContainer>;

type Story = StoryObj<typeof meta>;

// Primary articles page view selector container old

export const PrimaryOld: Story = {
  args: {},
};

// Dark articles page view selector container old

export const DarkOld: Story = {
  args: {},
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange articles page view selector container old

export const OrangeOld: Story = {
  args: {},
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary articles page view selector container new

export const PrimaryNew: Story = {
  args: {},
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateViewSelectorContainerRedesigned)];

// Dark articles page view selector container new

export const DarkNew: Story = {
  args: {},
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateViewSelectorContainerRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange articles page view selector container new

export const OrangeNew: Story = {
  args: {},
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateViewSelectorContainerRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
