import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import classes from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);
  const password = useSelector(getLoginPassword);
  const username = useSelector(getLoginUsername);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    try {
      const response = await dispatch(loginByUsername({ password, username }));

      if (response.meta.requestStatus === 'fulfilled') {
        onSuccess?.(); // закрываем модалку только на успешный респонс
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error: ${e}`);
    }
  }, [dispatch, onSuccess, password, username]);

  return (
    <DynamicModuleLoader
/*    плохой вариант (пересоздание объекта на каждый ререндер)
      reducers={{ loginForm: loginReducer }}                */
      reducers={initialReducers} // 'initialReducers' ссылка меняться не будет
    >
      <div className={classNames(classes.LoginForm, {}, [className])}>
        <Text title={t('Форма авторизации')} />

        {error && (
          <Text
            text={t('Вы ввели неверный логин или пароль')}
            theme={TextTheme.ERROR}
          />
        )}

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
    </DynamicModuleLoader>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
