import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Text, TextAlign } from '@/shared/ui/Text';

import { ArticleImageBlock } from '../../model/types/article';

import classes from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  block: ArticleImageBlock;
  className?: string;
}

export const ArticleImageBlockComponent = memo(
  ({ block, className }: ArticleImageBlockComponentProps) => (
    <div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
      <img alt={block.title} className={classes.img} src={block.src} />

      {block.title && <Text align={TextAlign.CENTER} text={block.title} />}
    </div>
  ),
);

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
