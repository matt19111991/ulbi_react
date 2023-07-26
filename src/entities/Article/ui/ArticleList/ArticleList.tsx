import { HTMLAttributeAnchorTarget, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Text } from 'shared/ui/Text/Text';

import { Article, ArticleView } from '../../model/types/article';

import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';

import classes from './ArticleList.module.scss';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: ArticleView,
}

const getSkeletons = (target: HTMLAttributeAnchorTarget, view: ArticleView): ReactNode => {
  let skeletonsAmount = 0;

  if (target === '_blank') { // check on recommendations
    skeletonsAmount = 3;
  } else if (view === ArticleView.PLATE) {
    skeletonsAmount = 9;
  } else {
    skeletonsAmount = 4;
  }

  return new Array(skeletonsAmount)
    .fill(0)
    .map((_, idx) => (
      <ArticleListItemSkeleton
        className={classes.card}
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        view={view}
      />
    ));
};

export const ArticleList = memo(({
  articles,
  className,
  isLoading,
  target,
  view = ArticleView.PLATE,
}: ArticleListProps) => {
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      className={classes.card}
      key={article.id}
      target={target}
      view={view}
    />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        <Text title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, classes[view]])}>
      {articles.length ? articles.map(renderArticle) : null}

      {isLoading && getSkeletons(target!, view)}
    </div>
  );
});

ArticleList.displayName = 'ArticleList';
