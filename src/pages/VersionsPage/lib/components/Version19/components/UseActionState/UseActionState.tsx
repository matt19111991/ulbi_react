import { useActionState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { fakeLogin } from '../../api/api';

import { UseFormStatusButton } from '../UseFormStatusButton/UseFormStatusButton';

import classes from './UseActionState.module.scss';

interface FormValues {
  login: string;
  password: string;
}

interface Form {
  data: FormValues | null;
  error: Error['message'] | null;
}

const initialForm: Form = {
  data: null,
  error: null,
};

export const UseActionState = () => {
  const { t } = useTranslation();

  const [form, formAction] = useActionState(handleSubmit, initialForm);

  /*
    не нужны отдельные состояния при использовании 'useActionState'

    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState('');
  */

  async function handleSubmit(prevState: Form, formData: FormData) {
    // т.к. форму подтверждаем через 'action' атрибут, то больше не нужен 'e.preventDefault()'

    const login = formData.get('login') as FormValues['login'];
    const password = formData.get('password') as FormValues['password'];

    try {
      const response = (await fakeLogin({ login, password })) as FormValues;

      return {
        data: response,
        error: null,
      };
    } catch (e) {
      return {
        ...prevState,
        data: null,
        error: (e as Error).message,
      };
    }
  }

  /*
    при использовании 'action' атрибута у формы нужно указать атрибуты 'name'
    у полей ввода и можно удалить 'onChange()' и 'value'
  */

  return (
    <form action={formAction}>
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

        <UseFormStatusButton />

        {form?.data?.login && (
          <Text text={t('Пользователь залогинился', { user: form.data.login })} variant='accent' />
        )}

        {/* i18next-extract-disable-next-line */}
        {form?.error && <Text text={t(form?.error)} variant='error' />}
      </VStack>
    </form>
  );
};
