import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import type { ArticleTextBlock } from '../../model/types/article';

import classes from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  /**
   * Тип блока
   */
  block: ArticleTextBlock;

  /**
   * Внешний класс
   */
  className?: string;
}

export const ArticleTextBlockComponent = memo(
  ({ block, className }: ArticleTextBlockComponentProps) => (
    <div className={classNames('', {}, [className])}>
      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<TextRedesigned className={classes.title} title={block.title} />}
          off={<TextDeprecated className={classes.title} title={block.title} />}
        />
      )}

      {block.paragraphs.map((paragraph, index) => (
        // можно использовать 'index', т.к. массив изменяться не будет
        <ToggleFeatures
          feature='isAppRedesigned'
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          on={<TextRedesigned className={classes.paragraph} text={paragraph} />}
          off={<TextDeprecated className={classes.paragraph} text={paragraph} />}
        />
      ))}
    </div>
  ),
);

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent';
