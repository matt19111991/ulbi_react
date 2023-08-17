import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Code } from '@/shared/ui/Code';

import { ArticleCodeBlock } from '../../model/types/article';

import classes from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  block: ArticleCodeBlock;
  className?: string;
}

export const ArticleCodeBlockComponent = memo(({
  block,
  className,
}: ArticleCodeBlockComponentProps) => (
  <div
    className={
      classNames(classes.ArticleCodeBlockComponent, {}, [className])
    }
  >
    <Code text={block.code} />
  </div>
));

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent';
