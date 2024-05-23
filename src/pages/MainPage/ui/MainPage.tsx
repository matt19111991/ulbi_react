import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';

import classes from './MainPage.module.scss';

const MainPage = () => {
  const { t } = useTranslation();

  const user = useSelector(getUserAuthData);

  return (
    <Page
      className={classNames(classes.MainPage, { [classes.authorized]: Boolean(user) })}
      data-testid='MainPage'
    >
      {t('Пароль')}
    </Page>
  );
};

export default memo(MainPage);
