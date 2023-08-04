import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Page } from 'widgets/Page';

import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();

  return (
    <Page
      className={
        classNames(classes.ForbiddenPage, {}, [className])
      }
    >
      {t('У вас нет доступа к этой странице')}
    </Page>
  );
};

export default memo(ForbiddenPage);
