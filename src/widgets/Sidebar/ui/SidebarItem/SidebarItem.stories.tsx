import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/shared/assets/tests/storybook3.svg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
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

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark sidebar item new

export const DarkNew: Story = {
  args: {
    item: sidebarItem,
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange sidebar item new

export const OrangeNew: Story = {
  args: {
    item: sidebarItem,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
