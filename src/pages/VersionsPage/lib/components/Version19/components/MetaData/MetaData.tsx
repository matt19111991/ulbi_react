import { useTranslation } from 'react-i18next';

import { Text } from '@/shared/ui/redesigned/Text';

/*
  когда 'React' отображает компонент, он увидит теги '<title>', '<link>' и
 '<meta>' и автоматически поднимет их в раздел '<head>' документа
*/

export const MetaData = () => {
  const { t } = useTranslation();

  return (
    <article>
      <Text size='l' text={t('Название блока')} />

      <title>{t('Название блока')}</title>

      <meta content='Jack' name='author' />

      <link href='https://matt610.ru' rel='author' />

      <meta content={'JavaScript,  React'} name='keywords' />

      <Text size='m' text={t('Скоро будет')} />
    </article>
  );
};
