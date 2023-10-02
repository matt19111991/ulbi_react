import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

import classes from './MainPage.module.scss';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page className={classes.MainPage} data-testid='MainPage'>
      {t('Главная страница')}
    </Page>
  );
};

export default memo(MainPage);
