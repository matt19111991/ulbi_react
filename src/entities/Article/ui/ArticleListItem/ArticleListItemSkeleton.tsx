import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

import { ArticleView } from '../../model/types/article';

import classes from './ArticleListItemSkeleton.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
  if (view === ArticleView.LIST) {
    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        <Card>
          <div className={classes.header}>
            <Skeleton border='50%' height={30} width={30} />
            <Skeleton className={classes.username} height={16} width={150} />
            <Skeleton className={classes.date} height={16} width={150} />
          </div>

          <Skeleton className={classes.title} height={24} width={250} />

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
