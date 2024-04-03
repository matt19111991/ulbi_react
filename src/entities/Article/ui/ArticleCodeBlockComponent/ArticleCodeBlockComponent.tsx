import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Code } from '@/shared/ui/redesigned/Code';

import type { ArticleCodeBlock } from '../../model/types/article';

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

export const ArticleCodeBlockComponent = memo(
  ({ block, className }: ArticleCodeBlockComponentProps) => (
    <div className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  ),
);

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent';
