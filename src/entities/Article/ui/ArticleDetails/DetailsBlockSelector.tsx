import { ArticleBlockType } from '../../model/consts/articleConsts';

import { ArticleBlock } from '../../model/types/article';

import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

/**
 * Принимаем на вход тип блока
 */
export const DetailsBlockSelector = (block: ArticleBlock) => {
  const { id, type } = block;

  switch (type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent block={block} key={id} />;

    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent block={block} key={id} />;

    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent block={block} key={id} />;

    default:
      return null;
  }
};
