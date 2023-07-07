import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';

import classes from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  onCloseModal: () => void;
}

export const LoginForm = memo(({ className, onCloseModal }: LoginFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    error,
    isLoading,
    password,
    username,
  } = useSelector(getLoginState);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    try {
      await dispatch<any>(loginByUsername({ password, username }));

      onCloseModal();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error: ${e}`);
    }
  }, [dispatch, onCloseModal, password, username]);

  return (
    <div className={classNames(classes.LoginForm, {}, [className])}>
      <Text title={t('Форма авторизации')} />
      {error && <Text text={error} theme={TextTheme.ERROR} />}

      <Input
        autoFocus
        className={classes.input}
        onChange={onChangeUsername}
        placeholder={t('Введите имя пользователя')}
        type='text'
        value={username}
      />

      <Input
        className={classes.input}
        onChange={onChangePassword}
        placeholder={t('Введите пароль')}
        type='text'
        value={password}
      />

      <Button
        className={classes.loginBtn}
        disabled={isLoading}
        onClick={onLoginClick}
        theme={ButtonTheme.OUTLINE}
      >
        {t('Войти')}
      </Button>
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
