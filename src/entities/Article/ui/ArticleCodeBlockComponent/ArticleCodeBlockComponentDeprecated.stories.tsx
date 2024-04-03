import type { Meta, StoryObj } from '@storybook/react';

import { IndentsDecorator } from '@/shared/config/storybook/IndentsDecorator/IndentsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleBlockType } from '../../model/consts/articleConsts';

import type { ArticleCodeBlock } from '../../model/types/article';

import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

const block: ArticleCodeBlock = {
  id: '1',
  code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
  type: ArticleBlockType.CODE,
};

const meta = {
  title: 'entities/Article/ArticleBlock/Code/old',
  component: ArticleCodeBlockComponent,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleCodeBlockComponent>;

type Story = StoryObj<typeof meta>;

// Primary article code block

export const Primary: Story = {
  args: { block },
};

Primary.decorators = [IndentsDecorator];

// Dark article code block

export const Dark: Story = {
  args: { block },
};

Dark.decorators = [IndentsDecorator, ThemeDecorator(Theme.DARK)];

// Orange article code block

export const Orange: Story = {
  args: { block },
};

Orange.decorators = [IndentsDecorator, ThemeDecorator(Theme.ORANGE)];

export default meta;
