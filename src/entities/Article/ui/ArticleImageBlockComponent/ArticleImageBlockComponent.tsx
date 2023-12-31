import { classNames } from '@/shared/lib/classNames/classNames';
import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';

import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { ArticleImageBlock } from '../../model/types/article';

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

const ArticleImageBlockComponent = ({ block, className }: ArticleImageBlockComponentProps) => (
  <div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
    <img alt={block.title} className={classes.img} src={block.src} />

    {block.title && (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<TextRedesigned align='center' text={block.title} />}
        off={<TextDeprecated align={TextAlign.CENTER} text={block.title} />}
      />
    )}
  </div>
);

const MemoizedArticleImageBlockComponent = genericMemo(ArticleImageBlockComponent);

export { MemoizedArticleImageBlockComponent as ArticleImageBlockComponent };
