import type { JSX } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { StickyContentLayout } from './StickyContentLayout';

const getComponent = (component: 'content' | 'left' | 'right'): JSX.Element => (
  <div
    style={{
      border: '1px solid var(--hint-redesigned)',
      height: component === 'content' ? '200vh' : '90vh',
      padding: 8,
    }}
  >
    {`${component.charAt(0).toUpperCase()}${component.slice(1)}`}
  </div>
);

const meta = {
  title: 'shared/layouts/StickyContentLayout',
  component: StickyContentLayout,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof StickyContentLayout>;

type Story = StoryObj<typeof meta>;

// Primary sticky content layout

export const Primary: Story = {
  args: {
    content: getComponent('content'),
    left: getComponent('left'),
    right: getComponent('right'),
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark sticky content layout

export const Dark: Story = {
  args: {
    content: getComponent('content'),
    left: getComponent('left'),
    right: getComponent('right'),
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange sticky content layout

export const Orange: Story = {
  args: {
    content: getComponent('content'),
    left: getComponent('left'),
    right: getComponent('right'),
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Sticky content layout with only left component

export const OnlyLeft: Story = {
  args: {
    content: getComponent('content'),
    left: getComponent('left'),
  },
};

OnlyLeft.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Sticky content layout with only right component

export const OnlyRight: Story = {
  args: {
    content: getComponent('content'),
    right: getComponent('right'),
  },
};

OnlyRight.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

export default meta;
