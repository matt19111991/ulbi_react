import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Text } from '@/shared/ui/Text';

import { ArticleTextBlock } from '../../model/types/article';

import classes from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  block: ArticleTextBlock;
  className?: string;
}

export const ArticleTextBlockComponent = memo(
  ({ block, className }: ArticleTextBlockComponentProps) => (
    <div className={classNames('', {}, [className])}>
      {block.title && <Text className={classes.title} title={block.title} />}

      {block.paragraphs.map((paragraph, index) => (
        // можно использовать 'index', т.к. массив изменяться не будет
        // eslint-disable-next-line react/no-array-index-key
        <Text className={classes.paragraph} key={index} text={paragraph} />
      ))}
    </div>
  ),
);

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent';
