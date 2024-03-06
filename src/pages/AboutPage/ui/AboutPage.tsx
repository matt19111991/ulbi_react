import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Page } from '@/widgets/Page';

import classes from './AboutPage.module.scss';

const AboutPage = () => {
  /*
    передаем название namespace => /public/locales/[lng]/about.json

    Если в useTranslation() не указывать значение namespace,
    будет использоваться 'translation' namespace
  */

  const { t } = useTranslation('about');

  const user = useSelector(getUserAuthData);

  return (
    <Page
      className={classNames(classes.AboutPage, { [classes.authorized]: Boolean(user) })}
      data-testid='AboutPage'
    >
      {t('О сайте')}
    </Page>
  );
};

export default memo(AboutPage);
