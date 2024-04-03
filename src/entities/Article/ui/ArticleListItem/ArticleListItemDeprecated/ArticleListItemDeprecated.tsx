import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

import { getRouteArticleDetails } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';

import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';

import { AppImage } from '@/shared/ui/redesigned/AppImage';

import { ArticleBlockType, ArticleView } from '../../../model/consts/articleConsts';

import type { ArticleTextBlock } from '../../../model/types/article';

import type { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';

import classes from './ArticleListItemDeprecated.module.scss';

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const ArticleListItemDeprecated = memo(
  ({ article, className, target, view }: ArticleListItemProps) => {
    const [isHover, hoverHandlers] = useHover();
    console.log('isHover', isHover);

    const { t } = useTranslation();

    if (view === ArticleView.LIST) {
      const firstTextBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
        <div
          className={classNames('', {}, [className, classes[view]])}
          data-testid='ArticleListItem'
        >
          <Card>
            <div className={classes.header}>
              <Avatar size={30} src={article.user.avatar} />

              <Text className={classes.username} text={article.user.username} />

              <Text className={classes.date} text={article.createdAt} />
            </div>

            <Text className={classes.title} title={article.title} />

            <Text className={classes.types} text={article.type.join(', ')} />

            <AppImage
              alt={article.title}
              className={classes.image}
              loadingFallback={<Skeleton height={250} width='100%' />}
              src={article.img}
            />

            {firstTextBlock && (
              <ArticleTextBlockComponent block={firstTextBlock} className={classes.textBlock} />
            )}

            <div className={classes.footer}>
              {/*
                Для доступности лучше использовать 'AppLink' чем вешать 'onClick' на кнопку
                Если кликнуть средней кнопкой мыши на кнопку, то в случае с 'onClick' перехода
                по ссылке не будет. С 'AppLink' переход по ссылке отработает
              */}
              <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                <Button theme={ButtonTheme.OUTLINE}>{t('Читать далее')}...</Button>
              </AppLink>

              <Text className={classes.views} text={String(article.views || 0)} />
              <Icon Svg={EyeIcon} />
            </div>
          </Card>
        </div>
      );
    }

    /*
      Для доступности лучше использовать 'AppLink' чем вешать 'onClick' на 'Card'
      Если кликнуть средней кнопкой мыши на карточку, то в случае с 'onClick' перехода
      по ссылке не будет. С 'AppLink' переход по ссылке отработает
    */

    return (
      <AppLink
        className={classNames('', {}, [className, classes[view]])}
        data-testid='ArticleListItem'
        target={target}
        to={getRouteArticleDetails(article.id)}
        {...hoverHandlers}
      >
        <Card className={classes.card}>
          <div className={classes.imageWrapper}>
            <AppImage
              alt={article.title}
              className={classes.image}
              loadingFallback={<Skeleton height={200} width={200} />}
              src={article.img}
            />

            <Text className={classes.date} text={article.createdAt} />
          </div>

          <div className={classes.infoWrapper}>
            <Text className={classes.types} text={article.type.join(', ')} />

            <Text className={classes.views} text={String(article.views || 0)} />

            <Icon Svg={EyeIcon} />
          </div>

          <Text className={classes.title} text={article.title} />
        </Card>
      </AppLink>
    );
  },
);

ArticleListItemDeprecated.displayName = 'ArticleListItemDeprecated';
