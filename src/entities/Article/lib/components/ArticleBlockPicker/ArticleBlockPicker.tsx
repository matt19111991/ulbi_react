import { ArticleBlockType } from '../../../model/consts/articleConsts';

import type { ArticleBlock } from '../../../model/types/article';

import { ArticleCodeBlockComponent } from '../../../ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../../../ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleBlockPickerProps {
  /**
   * Тип блока
   */
  block: ArticleBlock;

  /**
   * Внешний класс
   */
  className?: string;
}

export const ArticleBlockPicker = ({ block, className }: ArticleBlockPickerProps) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent block={block} className={className} />;

    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent block={block} className={className} />;

    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent block={block} className={className} />;

    default:
      return null;
  }
};
