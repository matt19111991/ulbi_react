import { classNames } from '@/shared/lib/classNames/classNames';
import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo';

import { Code } from '@/shared/ui/redesigned/Code';

import { ArticleCodeBlock } from '../../model/types/article';

import classes from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  /**
   * Компонент с блоком, содержащим код
   */
  block: ArticleCodeBlock;

  /**
   * Внешний класс
   */
  className?: string;
}

const ArticleCodeBlockComponent = ({ block, className }: ArticleCodeBlockComponentProps) => (
  <div className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}>
    <Code text={block.code} />
  </div>
);

const MemoizedArticleCodeBlockComponent = genericMemo(ArticleCodeBlockComponent);

export { MemoizedArticleCodeBlockComponent as ArticleCodeBlockComponent };
