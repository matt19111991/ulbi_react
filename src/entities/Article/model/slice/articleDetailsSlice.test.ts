import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';

import { Article, ArticleBlockType, ArticleType } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

import { articleDetailsReducer } from './articleDetailsSlice';

describe('articleDetailsSlice', () => {
  test('test set pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      error: 'Error',
      isLoading: false,
    };

    const reducer = articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending);

    expect(reducer).toEqual({ error: undefined, isLoading: true });
  });

  test('test set fulfilled', () => {
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
      views: 1022,
    };

    const state: DeepPartial<ArticleDetailsSchema> = {
      data: undefined,
      isLoading: true,
    };

    const reducer = articleDetailsReducer(
      state as ArticleDetailsSchema,
      fetchArticleById.fulfilled(article, '', ''), // 2 и 3 аргументы - заглушки
    );

    expect(reducer).toEqual({ data: article, isLoading: false });
  });
});
