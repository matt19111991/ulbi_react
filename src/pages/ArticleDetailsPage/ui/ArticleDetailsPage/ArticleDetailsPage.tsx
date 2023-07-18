import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import { classNames } from 'shared/lib/classNames/classNames';

import { Text } from 'shared/ui/Text/Text';

import classes from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');

  if (!id) {
    return (
      <div className={classNames(classes.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <div className={classNames(classes.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />

      <Text className={classes.commentTitle} title={t('Комментарии')} />
      <CommentList
        comments={[
          { id: '1', text: 'comment 1', user: { id: '1', username: 'Jack' } },
          { id: '2', text: 'comment 2', user: { id: '1', username: 'Jack' } },
        ]}
      />
    </div>
  );
};

export default memo(ArticleDetailsPage);
