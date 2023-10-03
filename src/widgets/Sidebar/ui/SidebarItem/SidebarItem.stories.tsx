import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/shared/assets/tests/storybook3.svg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { getRouteMain } from '@/shared/const/router';
import { Theme } from '@/shared/const/theme';

import { SidebarItem } from './SidebarItem';

const sidebarItem = {
  Icon,
  order: 1,
  path: getRouteMain(),
  text: 'Главная',
};

const meta = {
  title: 'widgets/Sidebar/SidebarItem',
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

PrimaryOld.decorators = [IndentsDecorator];

// Dark sidebar item old

export const DarkOld: Story = {
  args: {
    item: sidebarItem,
  },
};

DarkOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange sidebar item old

export const OrangeOld: Story = {
  args: {
    item: sidebarItem,
  },
};

OrangeOld.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

// Primary sidebar item new

export const PrimaryNew: Story = {
  args: {
    item: sidebarItem,
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), IndentsDecorator];

// Dark sidebar item new

export const DarkNew: Story = {
  args: {
    item: sidebarItem,
  },
};

DarkNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar item new

export const OrangeNew: Story = {
  args: {
    item: sidebarItem,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
