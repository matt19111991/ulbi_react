import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';

import Image from '@/shared/assets/tests/storybook.jpg';

import {
  RedesignDecorator,
  redesignState,
} from '@/shared/config/storybook/RedesignDecorator/RedesignDecorator';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
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

const stateArticleImageBlockComponentRedesigned: DeepPartial<StateSchema> = redesignState;

const meta = {
  title: 'entities/ArticleDetails/blocks/Image/new',
  component: ArticleImageBlockComponent,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [RedesignDecorator, StoreDecorator(stateArticleImageBlockComponentRedesigned)],
} as Meta<typeof ArticleImageBlockComponent>;

type Story = StoryObj<typeof meta>;

// Primary article image block

export const Primary: Story = {
  args: { block },
};

// Dark article image block

export const Dark: Story = {
  args: { block },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article image block

export const Orange: Story = {
  args: { block },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
