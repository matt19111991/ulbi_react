import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ArticleType } from '@/entities/Article';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleTypeTabs } from './ArticleTypeTabs';

const meta = {
  title: 'features/ArticleTypeTabs',
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleTypeTabs>;

type Story = StoryObj<typeof meta>;

// Primary article type tabs old

export const PrimaryOld: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

// Dark article type tabs old

export const DarkOld: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

DarkOld.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article type tabs old

export const OrangeOld: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

OrangeOld.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article type tabs new

export const PrimaryNew: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

PrimaryNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article type tabs new

export const DarkNew: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

DarkNew.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange article type tabs new

export const OrangeNew: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

OrangeNew.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
