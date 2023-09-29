import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';

import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import { ArticleView } from '../../model/consts/articleConsts';

import classes from './ArticleListItemSkeleton.module.scss';

interface ArticleListItemSkeletonProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Вид статьи
   */
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
  const Card = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => CardRedesigned,
    off: () => CardDeprecated,
  });

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => classes.ArticleListItemSkeletonRedesigned,
    off: () => classes.ArticleListItemSkeletonDeprecated,
  });

  if (view === ArticleView.LIST) {
    return (
      <div className={classNames(mainClass, {}, [className, classes[view]])}>
        <Card className={classes.card}>
          <div className={classes.top}>
            <div className={classes.header}>
              <Skeleton border='50%' height={30} width={30} />
              <Skeleton className={classes.username} height={16} width={150} />
              <Skeleton className={classes.date} height={16} width={150} />
            </div>

            <Skeleton className={classes.title} height={32} width={250} />
            <Skeleton className={classes.subtitle} height={24} width={250} />
          </div>

          <Skeleton className={classes.image} />

          <Skeleton className={classes.description} height={60} />

          <div className={classes.footer}>
            <Skeleton height={36} width={180} />
            <Skeleton className={classes.review} height={36} width={100} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(mainClass, {}, [className, classes[view]])}>
      <Card className={classes.card}>
        <div className={classes.imageWrapper}>
          <Skeleton className={classes.image} height={200} width={200} />
        </div>

        <div className={classes.infoWrapper}>
          <Skeleton height={16} width={130} />
        </div>

        <Skeleton className={classes.title} height={16} width={150} />

        <Skeleton className={classes.date} height={24} width={108} />
        <Skeleton className={classes.views} height={24} width={56} />

        <Skeleton className={classes.userInfo} height={24} width={100} />
      </Card>
    </div>
  );
});

ArticleListItemSkeleton.displayName = 'ArticleListItemSkeleton';
