import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ScrollToolbar } from './ScrollToolbar';

const meta = {
  title: 'widgets/Scroll/ScrollToolbar',
  component: ScrollToolbar,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ScrollToolbar>;

type Story = StoryObj<typeof meta>;

const FullHeightDecorator = (Story: StoryFn) => (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      outline: '1px solid black',
      width: 32,
    }}
  >
    <Story />
  </div>
);

// Primary scroll toolbar

export const Primary: Story = {
  args: {},
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), FullHeightDecorator];

// Dark scroll toolbar

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  ThemeDecorator(Theme.DARK),
];

// Orange scroll toolbar

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  FullHeightDecorator,
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
