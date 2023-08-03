import type { Meta, StoryObj } from '@storybook/react';

import { StateSchema } from 'app/providers/StoreProvider';
import { Theme } from 'app/providers/ThemeProvider';

import {
  Article,
  ArticleBlockType,
  ArticleType,
} from 'entities/Article';

import UserAvatar from 'shared/assets/tests/storybook.jpg';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ArticleInfiniteList } from './ArticleInfiniteList';

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

const generateArticles = (
  amount: number,
): { entities: Record<string, Article>, ids: Array<string> } => {
  const entities: Record<string, Article> = {};
  const ids: Array<string> = [];

  const articles = new Array(amount)
    .fill(amount)
    .map((_, idx) => ({ ...article, id: String(idx + 1) }));

  articles.forEach((art) => {
    entities[art.id] = art;

    ids.push(art.id);
  });

  return { entities, ids };
};

const generatedArticles = generateArticles(18);

const stateArticleInfiniteList: DeepPartial<StateSchema> = {
  articlesPage: {
    entities: generatedArticles.entities,
    ids: generatedArticles.ids,
  },
};

const meta = {
  title: 'pages/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof ArticleInfiniteList>;

type Story = StoryObj<typeof meta>;

// Primary article infinite list

export const Primary: Story = {
  args: {},
};

Primary.decorators = [StoreDecorator(stateArticleInfiniteList)];

// Dark article infinite list

export const Dark: Story = {
  args: {},
};

Dark.decorators = [
  StoreDecorator(stateArticleInfiniteList),
  ThemeDecorator(Theme.DARK),
];

// Orange article infinite list

export const Orange: Story = {
  args: {},
};

Orange.decorators = [
  StoreDecorator(stateArticleInfiniteList),
  ThemeDecorator(Theme.ORANGE),
];

export default meta;
