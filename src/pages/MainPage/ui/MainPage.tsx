import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid='MainPage'>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      {t('Главная страница')}
      ddsdsads
    </Page>
  );
};

export default memo(MainPage);
