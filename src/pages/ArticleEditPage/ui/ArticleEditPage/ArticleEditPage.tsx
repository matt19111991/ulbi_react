import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';

import classes from './ArticleEditPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
  idFromStorybook?: string;
}

const ArticleDetailsPage = ({ className, idFromStorybook }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');

  let articleId = id;

  if (__PROJECT__ === 'storybook' && idFromStorybook) {
    articleId = idFromStorybook;
  }

  const isEdit = Boolean(articleId);

  return (
    <Page
      className={
        classNames(classes.ArticleEditPage, {}, [className])
      }
    >
      {isEdit
        ? `${t('Редактирование статьи с ID')} = ${articleId}`
        : t('Создание новой статьи')}
    </Page>
  );
};

export default memo(ArticleDetailsPage);
