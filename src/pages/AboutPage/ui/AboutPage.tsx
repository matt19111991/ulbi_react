import { useTranslation } from 'react-i18next';

const AboutPage = () => {
/*  передаем название namespace => /public/locales/[lng]/about.json
    Если в useTranslation() не указывать значение namespace,
    будет использоваться 'translation' namespace

*/  const { t } = useTranslation('about');

    return <div>{t('О сайте')}</div>;
};

export default AboutPage;
