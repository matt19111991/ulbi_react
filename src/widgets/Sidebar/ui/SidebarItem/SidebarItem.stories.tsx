import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/shared/assets/tests/storybook3.svg';

import { StateSchema } from '@/app/providers/StoreProvider';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { getRouteMain } from '@/shared/const/router';
import { Theme } from '@/shared/const/theme';

import { SidebarItem } from './SidebarItem';

const stateSidebarItemRedesigned: DeepPartial<StateSchema> = redesignState;

const sidebarItem = {
  Icon,
  order: 1,
  path: getRouteMain(),
  text: 'Главная',
};

const meta = {
  title: 'widgets/SidebarItem',
  component: SidebarItem,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof SidebarItem>;

type Story = StoryObj<typeof meta>;

// Primary sidebar item old

export const PrimaryOld: Story = {
  args: {
    item: sidebarItem,
  },
};

// Dark sidebar item old

export const DarkOld: Story = {
  args: {
    item: sidebarItem,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange sidebar item old

export const OrangeOld: Story = {
  args: {
    item: sidebarItem,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary sidebar item new

export const PrimaryNew: Story = {
  args: {
    item: sidebarItem,
  },
};

PrimaryNew.decorators = [RedesignDecorator, StoreDecorator(stateSidebarItemRedesigned)];

// Dark sidebar item new

export const DarkNew: Story = {
  args: {
    item: sidebarItem,
  },
};

DarkNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateSidebarItemRedesigned),
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar item new

export const OrangeNew: Story = {
  args: {
    item: sidebarItem,
  },
};

OrangeNew.decorators = [
  RedesignDecorator,
  StoreDecorator(stateSidebarItemRedesigned),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
