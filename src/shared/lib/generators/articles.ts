// eslint-disable-next-line path-checker-1911/layer-imports
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';

import UserAvatar from '@/shared/assets/tests/storybook.jpg';

export const article: Article = {
  id: '1',
  blocks: [
    {
      id: '1',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста.'
        + 'Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. '
        + 'В нашем случае речь идёт о браузерах и о серверной платформе Node.js. '
        + 'Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст '
        + 'в браузере, на настольном компьютере, это значит, что вы буквально в считанных'
        + ' секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном '
        + 'использовании программ на JavaScript, они загружаются в браузер для обеспечения '
        + 'работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением '
        + ' .js, которые подключают к веб-страницам, но программный код можно включать и '
        + 'непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда '
        + 'браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно '
        + 'посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий '
        + 'работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример '
        + 'можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы '
        + 'поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе '
        + '(например — в VS Code или в Notepad++) новый файл, который назовём hello.html, '
        + 'и добавим в него следующий код:',
      ],
      title: 'Заголовок этого блока',
      type: ArticleBlockType.TEXT,
    },
    {
      id: '2',
      // eslint-disable-next-line max-len
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
      type: ArticleBlockType.IMAGE,
    },
    {
      id: '3',
      // eslint-disable-next-line max-len
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
      type: ArticleBlockType.CODE,
    },
  ],
  createdAt: '26.02.2023',
  // eslint-disable-next-line max-len
  img: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png',
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

export const generateArticles = (amount: number): Article[] => new Array(amount)
  .fill(amount)
  .map((_, idx) => ({ ...article, id: String(idx + 1) }));

export const generateNormalizedArticles = (
  amount: number,
): { entities: Record<string, Article>; ids: Array<string> } => {
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
