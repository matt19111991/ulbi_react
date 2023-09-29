import type { Meta, StoryObj } from '@storybook/react';

import Image from '@/shared/assets/tests/storybook.jpg';

import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleBlockType } from '../../model/consts/articleConsts';

import { ArticleImageBlock } from '../../model/types/article';

import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';

const block: ArticleImageBlock = {
  id: '1',
  src: Image,
  title: 'Рисунок 1 - скриншот сайта',
  type: ArticleBlockType.IMAGE,
};

const meta = {
  title: 'entities/Article/ArticleDetails/blocks/Image/new',
  component: ArticleImageBlockComponent,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleImageBlockComponent>;

type Story = StoryObj<typeof meta>;

// Primary article image block

export const Primary: Story = {
  args: { block },
};

Primary.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];

// Dark article image block

export const Dark: Story = {
  args: { block },
};

Dark.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true }), ThemeDecorator(Theme.DARK)];

// Orange article image block

export const Orange: Story = {
  args: { block },
};

Orange.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
