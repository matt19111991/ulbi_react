import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Code } from 'shared/ui/Code/Code';

import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
  block: ArticleCodeBlock;
  className?: string;
}

export const ArticleCodeBlockComponent = memo(({
  block,
  className,
}: ArticleCodeBlockComponentProps) => (
  <div className={classNames('', {}, [className])}>
    <Code>{block.code}</Code>
  </div>
));

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent';
