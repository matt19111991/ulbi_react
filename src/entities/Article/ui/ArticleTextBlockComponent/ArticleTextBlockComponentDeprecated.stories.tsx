import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { ArticleBlockType } from '../../model/consts/articleConsts';

import { ArticleTextBlock } from '../../model/types/article';

import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';

const block: ArticleTextBlock = {
  id: '1',
  paragraphs: [
    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>.',
  ],
  title: 'Заголовок этого блока',
  type: ArticleBlockType.TEXT,
};

const meta = {
  title: 'entities/Article/ArticleDetails/blocks/Text/old',
  component: ArticleTextBlockComponent,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleTextBlockComponent>;

type Story = StoryObj<typeof meta>;

// Primary article text block

export const Primary: Story = {
  args: { block },
};

// Dark article text block

export const Dark: Story = {
  args: { block },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article text block

export const Orange: Story = {
  args: { block },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;
