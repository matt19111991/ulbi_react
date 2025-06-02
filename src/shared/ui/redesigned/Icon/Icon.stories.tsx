import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react';

import IconSvg from '@/shared/assets/tests/storybook3.svg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Icon } from './Icon';

const meta = {
  title: 'shared/components/new/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Icon>;

type Story = StoryObj<typeof meta>;

// Primary icon

export const Primary: Story = {
  args: {
    onClick: () => {},
    Svg: IconSvg,
  },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark icon

export const Dark: Story = {
  args: {
    onClick: () => {},
    Svg: IconSvg,
  },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange icon

export const Orange: Story = {
  args: {
    onClick: () => {},
    Svg: IconSvg,
  },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

// Icon clickable

type Clickable = true & undefined;

export const Clickable: Story = {
  args: {
    clickable: true as Clickable,
    onClick: action('onClick'),
    Svg: IconSvg,
  },
};

Clickable.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Icon custom size

export const CustomSize: Story = {
  args: {
    height: 40,
    onClick: () => {},
    Svg: IconSvg,
    width: 40,
  },
};

CustomSize.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

export default meta;
