import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Theme } from '@/app/providers/ThemeProvider';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleBlockType, ArticleType } from '../../model/consts/articleConsts';

import { ArticleDetails } from './ArticleDetails';

const stateArticleDetails: DeepPartial<StateSchema> = {
  articleDetails: {
    data: {
      id: '1',
      blocks: [
        {
          id: '1',
          paragraphs: [
            'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
            'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
            'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>.',
          ],
          title: 'Заголовок этого блока',
          type: ArticleBlockType.TEXT,
        },
        {
          id: '2',
          src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
          title: 'Рисунок 1 - скриншот сайта',
          type: ArticleBlockType.IMAGE,
        },
        {
          id: '3',
          code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
          type: ArticleBlockType.CODE,
        },
        {
          id: '4',
          code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
          type: ArticleBlockType.CODE,
        },
        {
          id: '5',
          paragraphs: [
            'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
            'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>.',
          ],
          title: 'Заголовок этого блока',
          type: ArticleBlockType.TEXT,
        },
        {
          id: '6',
          paragraphs: [
            'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
            'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>.',
          ],
          title: 'Заголовок этого блока',
          type: ArticleBlockType.TEXT,
        },
        {
          id: '7',
          src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
          title: 'Рисунок 1 - скриншот сайта',
          type: ArticleBlockType.IMAGE,
        },
        {
          id: '8',
          paragraphs: [
            'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
          ],
          title: 'Заголовок этого блока',
          type: ArticleBlockType.TEXT,
        },
        {
          id: '9',
          paragraphs: [
            'Это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
          ],
          title: 'Заголовок нового блока',
          type: ArticleBlockType.TEXT,
        },
      ],
      createdAt: '26.02.2023',
      img: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png',
      subtitle: 'Что нового в JS за 2023 год?',
      title: 'Javascript news',
      type: [ArticleType.IT],
      user: {
        id: '1',
        username: 'Jack',
      },
      views: 1022,
    },
  },
};

const meta = {
  title: 'entities/ArticleDetails',
  component: ArticleDetails,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetails>;

type Story = StoryObj<typeof meta>;

// Primary article details

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticleDetails)];

// Dark article details

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateArticleDetails), ThemeDecorator(Theme.DARK)];

// Orange article details

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateArticleDetails), ThemeDecorator(Theme.ORANGE)];

// Loading article details

const stateArticleDetailsLoading: DeepPartial<StateSchema> = {
  articleDetails: {
    isLoading: true,
  },
};

export const Loading: Story = {
  args: {},
};

Loading.decorators = [StoreDecorator(stateArticleDetailsLoading)];

// Error article details

const stateArticleDetailsError: DeepPartial<StateSchema> = {
  articleDetails: {
    error: 'Error',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [StoreDecorator(stateArticleDetailsError)];

export default meta;
