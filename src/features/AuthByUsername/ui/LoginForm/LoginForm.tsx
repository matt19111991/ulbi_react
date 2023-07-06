import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';

import classes from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { password, username } = useSelector(getLoginState);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch<any>(loginByUsername({ password, username }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(classes.LoginForm, {}, [className])}>
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
        onClick={onLoginClick}
        theme={ButtonTheme.OUTLINE}
      >
        {t('Войти')}
      </Button>
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
