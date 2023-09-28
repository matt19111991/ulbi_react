import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleCreateForm } from '@/features/ArticleCreateForm';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Text } from '@/shared/ui/deprecated/Text';

import { Page } from '@/widgets/Page';

import classes from './ArticleCreatePage.module.scss';

interface ArticleCreatePageProps {
  className?: string;
}

const ArticleCreatePage = ({ className }: ArticleCreatePageProps) => {
  const { t } = useTranslation();

  return (
    <Page className={classNames(classes.ArticleCreatePage, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<ArticleCreateForm />}
        off={<Text title={`${t('Скоро будет')} ...`} />}
      />
    </Page>
  );
};

export default memo(ArticleCreatePage);
