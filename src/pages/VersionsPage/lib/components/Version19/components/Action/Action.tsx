import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { fakeLogin } from '../../api/api';

import classes from './Action.module.scss';

export const Action = () => {
  const { t } = useTranslation();

  /*
    не нужны отдельные состояния при использовании 'action' атрибута у формы,
    значения полей будем доставать из 'formData'

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
  */

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (formData: FormData) => {
    // т.к. форму подтверждаем через 'action' атрибут, то больше не нужен 'e.preventDefault()'

    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    setPending(true);

    setError(null);

    setResult('');

    try {
      await fakeLogin({ login, password });

      setResult(`Пользователь ${login} залогинился`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPending(false);
    }
  };

  /*
    при использовании 'action' атрибута у формы нужно указать атрибуты 'name'
    у полей ввода и можно удалить 'onChange()' и 'value'
  */

  return (
    <form action={handleSubmit}>
      <VStack align='start' className={classes.container} gap='24'>
        <Input
          autoComplete='username' // иначе предупреждение в консоли
          label={t('Имя пользователя')}
          name='login'
          // onChange={setLogin}
          type='text'
          // value={login}
          verticalLabel
        />

        <Input
          autoComplete='current-password' // иначе предупреждение в консоли
          label={t('Пароль')}
          name='password'
          // onChange={setPassword}
          type='password'
          // value={password}
          verticalLabel
        />

        <Button disabled={pending} type='submit' variant='filled'>
          {pending ? `${t('Загрузка')}...` : t('Подтвердить')}
        </Button>

        {result && (
          <Text
            /* i18next-extract-disable-next-line */
            text={t(
              result
                .split(' ')
                .filter((word) => word === 'Пользователь' || word === 'залогинился')
                .join(' '),
              {
                user: result
                  .split(' ')
                  .filter((word) => word !== 'Пользователь' && word !== 'залогинился')
                  .join(' '),
              },
            )}
            variant='accent'
          />
        )}

        {/* i18next-extract-disable-next-line */}
        {error && <Text text={t(error)} variant='error' />}
      </VStack>
    </form>
  );
};
