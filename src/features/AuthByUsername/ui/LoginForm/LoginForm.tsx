import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import {
  DynamicModuleLoaderV2,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/hooks/useForceUpdate/useForceUpdate';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';

import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { Input as InputRedesigned } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import classes from './LoginForm.module.scss';

export interface LoginFormProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Коллбэк при успешном логине
   */
  onSuccess?: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const forceUpdate = useForceUpdate();
  const { t } = useTranslation();

  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);
  const password = useSelector(getLoginPassword);
  const username = useSelector(getLoginUsername);

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    try {
      const response = await dispatch(loginByUsername({ password, username }));

      if (response.meta.requestStatus === 'fulfilled') {
        onSuccess?.(); // закрываем модалку только на успешный респонс

        forceUpdate(); // вызываем принудительную перерисовку всего интерфейса
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error: ${e}`);
    }
  }, [dispatch, forceUpdate, onSuccess, password, username]);

  return (
    <DynamicModuleLoaderV2
      // плохой вариант (пересоздание объекта на каждый ререндер)
      // reducers={{ loginForm: loginReducer }}
      reducers={initialReducers} // 'initialReducers' ссылка меняться не будет
    >
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <VStack align='start' className={classNames(classes.LoginForm, {}, [className])} gap='16'>
            <TextRedesigned title={t('Форма авторизации')} />

            {error && (
              <TextRedesigned text={t('Вы ввели неверный логин или пароль')} variant='error' />
            )}

            <InputRedesigned
              autoFocus
              className={classes.input}
              fullWidth
              onChange={onChangeUsername}
              placeholder={t('Имя пользователя')}
              type='text'
              value={username}
            />

            <InputRedesigned
              className={classes.input}
              fullWidth
              onChange={onChangePassword}
              placeholder={t('Пароль')}
              type='text'
              value={password}
            />

            <ButtonRedesigned
              className={classes.loginBtn}
              disabled={isLoading}
              onClick={onLoginClick}
            >
              {t('Войти')}
            </ButtonRedesigned>
          </VStack>
        }
        off={
          <div className={classNames(classes.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Форма авторизации')} />

            {error && (
              <TextDeprecated
                text={t('Вы ввели неверный логин или пароль')}
                theme={TextTheme.ERROR}
              />
            )}

            <InputDeprecated
              autoFocus
              className={classes.input}
              onChange={onChangeUsername}
              placeholder={t('Имя пользователя')}
              type='text'
              value={username}
            />

            <InputDeprecated
              className={classes.input}
              onChange={onChangePassword}
              placeholder={t('Пароль')}
              type='text'
              value={password}
            />

            <ButtonDeprecated
              className={classes.loginBtn}
              disabled={isLoading}
              onClick={onLoginClick}
              theme={ButtonTheme.OUTLINE}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoaderV2>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
