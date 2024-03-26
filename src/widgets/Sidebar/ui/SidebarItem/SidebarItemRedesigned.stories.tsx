import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import Icon from '@/shared/assets/tests/storybook3.svg';

import '@/shared/config/i18n/i18nForStorybook';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { getRouteMain } from '@/shared/const/router';
import { Theme } from '@/shared/const/theme';

import type { SidebarItemType } from '../../model/types/sidebar';

import { SidebarItem } from './SidebarItem';

const sidebarItem: SidebarItemType = {
  Icon: () => <Icon height={22} width={22} />,
  order: 1,
  path: getRouteMain(),
  text: 'Главная',
};

const HeightCutDecorator = (Story: StoryFn) => (
  <div style={{ height: 32, overflow: 'hidden' }}>
    <Story />
  </div>
);

const meta = {
  title: 'widgets/Sidebar/SidebarItem/new',
  component: SidebarItem,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof SidebarItem>;

type Story = StoryObj<typeof meta>;

// Primary sidebar item

export const Primary: Story = {
  args: {
    item: sidebarItem,
  },
};

Primary.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  HeightCutDecorator,
  IndentsDecorator,
];

// Dark sidebar item

export const Dark: Story = {
  args: {
    item: sidebarItem,
  },
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  HeightCutDecorator,
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar item

export const Orange: Story = {
  args: {
    item: sidebarItem,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  HeightCutDecorator,
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

// Primary sidebar item collapsed

export const PrimaryCollapsed: Story = {
  args: {
    collapsed: true,
    item: sidebarItem,
  },
};

PrimaryCollapsed.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  HeightCutDecorator,
  IndentsDecorator,
];

// Dark sidebar item collapsed

export const DarkCollapsed: Story = {
  args: {
    collapsed: true,
    item: sidebarItem,
  },
};

DarkCollapsed.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  HeightCutDecorator,
  IndentsDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange sidebar item collapsed

export const OrangeCollapsed: Story = {
  args: {
    collapsed: true,
    item: sidebarItem,
  },
};

OrangeCollapsed.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  HeightCutDecorator,
  IndentsDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
