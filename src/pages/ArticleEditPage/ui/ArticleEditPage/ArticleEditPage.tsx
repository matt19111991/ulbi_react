import { memo } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ArticleEditForm } from '@/features/ArticleEditForm';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text } from '@/shared/ui/deprecated/Text';

import { Page } from '@/widgets/Page';

import classes from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * 'ID' статьи для 'storybook'
   */
  storybookId?: string;
}

const ArticleEditPage = ({ className, storybookId }: ArticleEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const articleId = __PROJECT__ === 'storybook' ? storybookId : id;

  if (!articleId) {
    return null;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Page className={classNames(classes.ArticleEditPage, {}, [className])}>
          <ArticleEditForm articleId={articleId} />
        </Page>
      }
      off={
        <Page className={classNames('', {}, [className])}>
          <Text title={`${t('Скоро будет')} ...`} />
        </Page>
      }
    />
  );
};

export default memo(ArticleEditPage);
