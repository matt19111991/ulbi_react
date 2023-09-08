import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card } from '@/shared/ui/deprecated/Card';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

import { ArticleView } from '../../model/consts/articleConsts';

import classes from './ArticleListItemSkeleton.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
  if (view === ArticleView.LIST) {
    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        <Card className={classes.card}>
          <div className={classes.top}>
            <div className={classes.header}>
              <Skeleton border='50%' height={30} width={30} />
              <Skeleton className={classes.username} height={16} width={150} />
              <Skeleton className={classes.date} height={16} width={150} />
            </div>

            <Skeleton className={classes.title} height={24} width={250} />
          </div>

          <Skeleton className={classes.image} height={200} />

          <div className={classes.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, classes[view]])}>
      <Card>
        <div className={classes.imageWrapper}>
          <Skeleton className={classes.image} height={200} width={200} />
        </div>

        <div className={classes.infoWrapper}>
          <Skeleton height={16} width={130} />
        </div>

        <Skeleton className={classes.title} height={16} width={150} />
      </Card>
    </div>
  );
});

ArticleListItemSkeleton.displayName = 'ArticleListItemSkeleton';
