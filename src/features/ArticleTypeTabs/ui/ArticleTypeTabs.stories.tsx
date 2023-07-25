import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import { ArticleType } from 'entities/Article';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

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

// Primary article type tabs

export const Primary: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

// Dark article type tabs

export const Dark: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article type tabs

export const Orange: Story = {
  args: {
    onChangeType: action('onChangeType'),
    value: ArticleType.IT,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
