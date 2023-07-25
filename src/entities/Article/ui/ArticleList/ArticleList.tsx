import { memo } from 'react';
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
  view?: ArticleView,
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.PLATE ? 9 : 4)
  .fill(0)
  .map((_, idx) => (
    <ArticleListItemSkeleton
      className={classes.card}
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      view={view}
    />
  ));

export const ArticleList = memo(({
  articles,
  className,
  isLoading,
  view = ArticleView.PLATE,
}: ArticleListProps) => {
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      className={classes.card}
      key={article.id}
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

      {isLoading && getSkeletons(view)}
    </div>
  );
});

ArticleList.displayName = 'ArticleList';
