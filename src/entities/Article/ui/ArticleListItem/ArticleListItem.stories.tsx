import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';

import UserAvatar from 'shared/assets/tests/storybook.jpg';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import {
  Article,
  ArticleBlockType,
  ArticleType,
  ArticleView,
} from '../../model/types/article';

import { ArticleListItem } from './ArticleListItem';

const article: Article = {
  id: '1',
  blocks: [
    {
      id: '1',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
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
  ],
  createdAt: '26.02.2023',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  subtitle: 'Что нового в JS за 2023 год?',
  title: 'Javascript news',
  type: [ArticleType.IT],
  user: {
    avatar: UserAvatar,
    id: '1',
    username: 'Jack',
  },
  views: 1022,
};

const meta = {
  title: 'entities/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleListItem>;

type Story = StoryObj<typeof meta>;

// Primary article list item

export const PrimaryListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

// Dark article list item

export const DarkListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

DarkListItem.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article list item

export const OrangeListItem: Story = {
  args: {
    article,
    view: ArticleView.LIST,
  },
};

OrangeListItem.decorators = [ThemeDecorator(Theme.ORANGE)];

// Primary article plate item

export const PrimaryPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

// Dark article plate item

export const DarkPlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

DarkPlateItem.decorators = [ThemeDecorator(Theme.DARK)];

// Orange article plate item

export const OrangePlateItem: Story = {
  args: {
    article,
    view: ArticleView.PLATE,
  },
};

OrangePlateItem.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;