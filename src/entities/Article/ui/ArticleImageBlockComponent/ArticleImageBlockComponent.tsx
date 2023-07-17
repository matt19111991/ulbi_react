import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  block: ArticleImageBlock;
  className?: string;
}

export const ArticleImageBlockComponent = memo(({
  block,
  className,
}: ArticleImageBlockComponentProps) => (
  <div className={classNames('', {}, [className])}>
    {block.src}
  </div>
));

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
