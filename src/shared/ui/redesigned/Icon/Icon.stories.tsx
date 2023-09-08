import type { Meta, StoryObj } from '@storybook/react';

import IconSvg from '@/shared/assets/tests/storybook3.svg';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Icon } from './Icon';

const meta = {
  title: 'shared/new/Icon',
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
    Svg: IconSvg,
  },
};

// Dark icon

export const Dark: Story = {
  args: {
    Svg: IconSvg,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange icon

export const Orange: Story = {
  args: {
    Svg: IconSvg,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Inverted icon

export const Inverted: Story = {
  args: {
    inverted: true,
    Svg: IconSvg,
  },
};

export default meta;
