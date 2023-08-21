import type { Meta, StoryObj } from '@storybook/react';

import BaseImg from '@/shared/assets/tests/storybook.jpg';
import ErrorImg from '@/shared/assets/tests/storybook4.svg';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import { AppImage } from './AppImage';

const meta = {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof AppImage>;

type Story = StoryObj<typeof meta>;

// Primary app image

export const Primary: Story = {
  args: {
    height: 120,
    src: BaseImg,
    width: 100,
  },
};

// Dark app image

export const Dark: Story = {
  args: {
    height: 120,
    src: BaseImg,
    width: 100,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange app image

export const Orange: Story = {
  args: {
    height: 120,
    src: BaseImg,
    width: 100,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

// Loading app image

export const Loading: Story = {
  args: {
    loadingFallback: <Skeleton height={120} width={100} />,
    storybookLoading: true,
  },
};

// Error app image

export const Error: Story = {
  args: {
    errorFallback: <Icon Svg={ErrorImg} />,
  },
};

// Alt app image

export const Alt: Story = {
  args: {
    alt: 'image',
  },
};

export default meta;
