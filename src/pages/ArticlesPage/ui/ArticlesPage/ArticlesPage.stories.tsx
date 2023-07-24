import type { Meta, StoryObj } from '@storybook/react';

import Image1 from 'shared/assets/tests/storybook.jpg';
import Image2 from 'shared/assets/tests/storybook2.jpg';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import {
  Article,
  ArticleBlockType,
  ArticleType,
  ArticleView,
} from 'entities/Article';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import ArticlesPage from './ArticlesPage';

const articles: Article[] = [
  {
    id: '1',
    blocks: [
      {
        id: '1',
        paragraphs: [
          'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
          'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
          'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '2',
        src: Image1,
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
          'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '6',
        paragraphs: [
          'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
          'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '7',
        src: Image1,
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
    img: Image1,
    subtitle: 'Что нового в JS за 2023 год?',
    title: 'Javascript news',
    type: [ArticleType.IT],
    user: {
      avatar: Image1,
      id: '1',
      username: 'Jack',
    },
    views: 1022,
  },
  {
    id: '2',
    blocks: [
      {
        id: '1',
        paragraphs: [
          'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
          'Python — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе. Если до сих пор вы не написали ни строчки кода и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой Python-программы.',
          'Существуют и другие способы запуска кода в браузере. Так, если говорить об обычном использовании программ на Python, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .py, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '2',
        src: Image1,
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
          'Существуют и другие способы запуска кода в браузере. Так, если говорить об обычном использовании программ на Python, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .py, которые подключают к веб-страницам',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '6',
        paragraphs: [
          'Python — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе. Если до сих пор вы не написали ни строчки кода и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой Python-программы.',
          'Существуют и другие способы запуска кода в браузере. Так, если говорить об обычном использовании программ на Python, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .py, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '7',
        src: Image1,
        title: 'Рисунок 1 - скриншот сайта',
        type: ArticleBlockType.IMAGE,
      },
      {
        id: '8',
        paragraphs: [
          'Python — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе. Если до сих пор вы не написали ни строчки кода и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой Python-программы.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '9',
        paragraphs: [
          'Это значит, что вы буквально в считанных секундах от своей первой Python-программы.',
        ],
        title: 'Заголовок нового блока',
        type: ArticleBlockType.TEXT,
      },
    ],
    createdAt: '19.01.2023',
    img: Image1,
    subtitle: 'Что нового у Python за 2023 год?',
    title: 'Python news',
    type: [ArticleType.IT],
    user: {
      avatar: Image2,
      id: '2',
      username: 'Mary',
    },
    views: 845,
  },
  {
    id: '3',
    blocks: [
      {
        id: '1',
        paragraphs: [
          'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
          'Kotlin — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе. Если до сих пор вы не написали ни строчки кода и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой Kotlin-программы.',
          'Существуют и другие способы запуска кода в браузере. Так, если говорить об обычном использовании программ на Kotlin, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .kt, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '2',
        src: Image1,
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
          'Существуют и другие способы запуска кода в браузере. Так, если говорить об обычном использовании программ на Kotlin, они загружаются в браузер для обеспечения работы веб-страниц.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '6',
        paragraphs: [
          'Kotlin — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе. Если до сих пор вы не написали ни строчки кода и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой Kotlin-программы.',
          'Существуют и другие способы запуска кода в браузере. Так, если говорить об обычном использовании программ на Kotlin, они загружаются в браузер для обеспечения работы веб-страниц.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '7',
        src: Image1,
        title: 'Рисунок 1 - скриншот сайта',
        type: ArticleBlockType.IMAGE,
      },
      {
        id: '8',
        paragraphs: [
          'Kotlin — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе. Если до сих пор вы не написали ни строчки кода и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой Kotlin-программы.',
        ],
        title: 'Заголовок этого блока',
        type: ArticleBlockType.TEXT,
      },
      {
        id: '9',
        paragraphs: [
          'Это значит, что вы буквально в считанных секундах от своей первой Kotlin-программы.',
        ],
        title: 'Заголовок нового блока',
        type: ArticleBlockType.TEXT,
      },
    ],
    createdAt: '13.04.2023',
    img: Image1,
    subtitle: 'Что нового у Kotlin за 2023 год?',
    title: 'Kotlin news',
    type: [ArticleType.IT],
    user: {
      avatar: Image1,
      id: '1',
      username: 'Jack',
    },
    views: 566,
  },
];

const stateArticles: DeepPartial<StateSchema> = {
  articlesPage: {
    areLoading: false,
    ids: ['1', '2', '3'],
    entities: {
      [articles.at(0)!.id]: articles.at(0),
      [articles.at(1)!.id]: articles.at(1),
      [articles.at(2)!.id]: articles.at(2),
    },
    hasMore: true,
    limit: 4,
    page: 1,
    view: ArticleView.LIST,
  },
};

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticlesPage>;

type Story = StoryObj<typeof meta>;

// Primary articles page

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticles)];

// Dark articles page

export const Dark: Story = {
  args: {},
};

Dark.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.DARK)];

// Orange articles page

export const Orange: Story = {
  args: {},
};

Orange.decorators = [StoreDecorator(stateArticles), ThemeDecorator(Theme.ORANGE)];

// Loading articles page

const stateArticlesLoading = {
  ...stateArticles,
  articlesPage: {
    ...stateArticles.articlesPage,
    areLoading: true,
  },
};

export const Loading: Story = {
  args: {},
};

Loading.decorators = [StoreDecorator(stateArticlesLoading)];

// Error articles page

const stateArticlesError = {
  ...stateArticles,
  articlesPage: {
    ...stateArticles.articlesPage,
    error: 'Error',
  },
};

export const Error: Story = {
  args: {},
};

Error.decorators = [StoreDecorator(stateArticlesError)];

export default meta;
