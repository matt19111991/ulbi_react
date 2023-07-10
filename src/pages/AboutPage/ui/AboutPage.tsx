import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = memo(() => {
/*
    передаем название namespace => /public/locales/[lng]/about.json

    Если в useTranslation() не указывать значение namespace,
    будет использоваться 'translation' namespace

*/  const { t } = useTranslation('about');

    return <div>{t('О сайте')}</div>;
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;
