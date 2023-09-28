import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleBlockType } from '../../model/consts/articleConsts';

import { ArticleFormBlock } from './ArticleFormBlock';

const meta = {
  title: 'entities/ArticleFormBlock',
  component: ArticleFormBlock,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleFormBlock>;

type Story = StoryObj<typeof meta>;

// Primary form article code block

export const PrimaryCode: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.CODE,
  },
};

// Dark form article code block

export const DarkCode: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.CODE,
  },
};

DarkCode.decorators = [ThemeDecorator(Theme.DARK)];

// Orange form article code block

export const OrangeCode: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.CODE,
  },
};

OrangeCode.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary form article image block

export const PrimaryImage: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.IMAGE,
  },
};

// Dark form article image block

export const DarkImage: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.IMAGE,
  },
};

DarkImage.decorators = [ThemeDecorator(Theme.DARK)];

// Orange form article image block

export const OrangeImage: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.IMAGE,
  },
};

OrangeImage.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary form article text block

export const PrimaryText: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.TEXT,
  },
};

// Dark form article text block

export const DarkText: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.TEXT,
  },
};

DarkText.decorators = [ThemeDecorator(Theme.DARK)];

// Orange form article text block

export const OrangeText: Story = {
  args: {
    onSubmit: action('onSubmit'),
    type: ArticleBlockType.TEXT,
  },
};

OrangeText.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
