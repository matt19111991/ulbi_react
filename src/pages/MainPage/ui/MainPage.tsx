import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from 'shared/ui/Input/Input';

const MainPage = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');

  const onChange = (val: string): void => {
    setValue(val);
  };

  return (
    <>
      <div>{t('Главная страница')}</div>

      <Input onChange={onChange} placeholder='Введите текст' value={value} />
    </>
  );
};

export default MainPage;
