import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import { ArticleBlockType, ArticleType } from 'entities/Article';

import Image1 from 'shared/assets/tests/storybook.jpg';
import Image2 from 'shared/assets/tests/storybook2.jpg';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import ArticleDetailsPage from './ArticleDetailsPage';

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
          src: Image2,
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
      img: Image2,
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
  articleDetailsPage: {
    comments: {
      areLoading: false,
      entities: {
        1: {
          id: '1',
          text: 'First comment',
          user: {
            avatar: Image1,
            id: '1',
            username: 'Jack',
          },
        },
        2: {
          id: '1',
          text: 'Nice article!',
          user: {
            avatar: Image2,
            id: '2',
            username: 'Mary',
          },
        },
      },
      ids: ['1', '2'],
    },
    recommendations: {
      entities: {
        1: {
          createdAt: '11.07.2022',
          id: '1',
          img: Image2,
          title: 'First recommended article',
          type: [ArticleType.ECONOMICS],
          user: {
            avatar: Image1,
            id: '1',
            username: 'Jack',
          },
        },
        2: {
          createdAt: '22.05.2023',
          id: '1',
          img: Image1,
          title: 'Next recommended article',
          type: [ArticleType.IT],
          views: 213,
          user: {
            avatar: Image2,
            id: '2',
            username: 'Mary',
          },
        },
      },
      ids: ['1', '2'],
    },
  },
};

const meta = {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleDetailsPage>;

type Story = StoryObj<typeof meta>;

// Primary article details page

export const Primary: Story = {
  args: {
    storybookId: '1',
  },
};

Primary.decorators = [StoreDecorator(stateArticleDetails)];

// Dark article details page

export const Dark: Story = {
  args: {
    storybookId: '1',
  },
};

Dark.decorators = [StoreDecorator(stateArticleDetails), ThemeDecorator(Theme.DARK)];

// Orange article details page

export const Orange: Story = {
  args: {
    storybookId: '1',
  },
};

Orange.decorators = [StoreDecorator(stateArticleDetails), ThemeDecorator(Theme.ORANGE)];

// Loading article details page

export const Loading: Story = {
  args: {
    storybookId: '1',
    storybookLoading: true,
  },
};

const stateArticleLoading: DeepPartial<StateSchema> = {
  articleDetails: {
    isLoading: true,
  },
  articleDetailsPage: {
    comments: {
      areLoading: true,
      entities: {},
      ids: [],
    },
  },
};

Loading.decorators = [StoreDecorator(stateArticleLoading)];

// Error article details page

export const Error: Story = {
  args: {
    storybookError: 'Error',
    storybookId: '1',
  },
};

const stateArticleError: DeepPartial<StateSchema> = {
  articleDetails: {
    error: 'Error',
  },
  articleDetailsPage: {
    comments: {
      areLoading: false,
      entities: {},
      ids: [],
    },
  },
};

Error.decorators = [StoreDecorator(stateArticleError)];

// Not found article details page

export const NotFound: Story = {
  args: {},
};

const stateArticleNotFound: DeepPartial<StateSchema> = {
  articleDetails: {},
};

NotFound.decorators = [StoreDecorator(stateArticleNotFound)];

export default meta;
