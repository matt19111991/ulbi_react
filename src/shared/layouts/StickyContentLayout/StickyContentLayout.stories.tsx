import type { Meta, StoryObj } from '@storybook/react';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { StickyContentLayout } from './StickyContentLayout';

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
    content: (
      <div style={{ border: '1px solid #D0D0D0', height: '200vh', padding: 8 }}>Content</div>
    ),
    left: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Left</div>,
    right: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Right</div>,
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark sticky content layout

export const Dark: Story = {
  args: {
    content: <div style={{ border: '1px solid #FFF', height: '200vh', padding: 8 }}>Content</div>,
    left: <div style={{ border: '1px solid #FFF', height: '90vh', padding: 8 }}>Left</div>,
    right: <div style={{ border: '1px solid #FFF', height: '90vh', padding: 8 }}>Right</div>,
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange sticky content layout

export const Orange: Story = {
  args: {
    content: (
      <div style={{ border: '1px solid #D0D0D0', height: '200vh', padding: 8 }}>Content</div>
    ),
    left: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Left</div>,
    right: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Right</div>,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Sticky content layout with only left component

export const OnlyLeft: Story = {
  args: {
    content: (
      <div style={{ border: '1px solid #D0D0D0', height: '200vh', padding: 8 }}>Content</div>
    ),
    left: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Left</div>,
  },
};

OnlyLeft.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Sticky content layout with only right component

export const OnlyRight: Story = {
  args: {
    content: (
      <div style={{ border: '1px solid #D0D0D0', height: '200vh', padding: 8 }}>Content</div>
    ),
    right: <div style={{ border: '1px solid #D0D0D0', height: '90vh', padding: 8 }}>Right</div>,
  },
};

OnlyRight.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

export default meta;
