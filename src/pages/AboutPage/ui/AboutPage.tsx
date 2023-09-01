import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

const AboutPage = () => {
  /*
    передаем название namespace => /public/locales/[lng]/about.json

    Если в useTranslation() не указывать значение namespace,
    будет использоваться 'translation' namespace
  */

  const { t } = useTranslation('about');

  return <Page data-testid='AboutPage'>1133231132{t('О сайте')}</Page>;
};

export default memo(AboutPage);
