import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleEditForm } from '@/features/ArticleEditForm';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Page } from '@/widgets/Page';

import { Text } from '@/shared/ui/deprecated/Text';

import classes from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * ID статьи для storybook
   */
  idFromStorybook?: string;
}

const ArticleEditPage = ({ className, idFromStorybook }: ArticleEditPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const articleId = idFromStorybook || id;

  return (
    <Page className={classNames(classes.ArticleEditPage, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ArticleEditForm articleId={articleId!} />}
        off={<Text title={`${t('Скоро будет')} ...`} />}
      />
    </Page>
  );
};

export default memo(ArticleEditPage);
