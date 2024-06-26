import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import type { ArticleImageBlock } from '../../model/types/article';

import classes from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  /**
   * Тип блока
   */
  block: ArticleImageBlock;

  /**
   * Внешний класс
   */
  className?: string;
}

export const ArticleImageBlockComponent = memo(
  ({ block, className }: ArticleImageBlockComponentProps) => (
    <div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
      <img alt={block.title} className={classes.img} src={block.src} />

      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<TextRedesigned text={block.title} />}
          off={<TextDeprecated text={block.title} />}
        />
      )}
    </div>
  ),
);

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
