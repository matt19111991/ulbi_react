import { useFormStatus } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';

export const UseFormStatusButton = () => {
  // данные ближайшей формы, находящейся выше в 'DOM'-дереве
  const { action, data, method, pending } = useFormStatus();

  console.log('---useFormStatus---');
  console.log('action', action);
  console.log('data', data);
  console.log('method', method);

  const { t } = useTranslation();

  return (
    <Button disabled={pending} type='submit' variant='filled'>
      {pending ? `${t('Загрузка')}...` : t('Подтвердить')}
    </Button>
  );
};
