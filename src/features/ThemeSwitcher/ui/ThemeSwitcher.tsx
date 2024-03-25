import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData, saveJsonSettings } from '@/entities/User';

import ThemeIconDeprecated from '@/shared/assets/icons/theme-old.svg';
import ThemeIcon from '@/shared/assets/icons/theme-redesigned.svg';

import { classNames } from '@/shared/lib/classNames/classNames';

import { ToggleFeatures } from '@/shared/lib/features';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';

import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
  /**
   * Внешний класс
   */
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const dispatch = useAppDispatch();
  const { toggleTheme } = useTheme();

  const user = useSelector(getUserAuthData);

  const onToggleHandler = useCallback(() => {
    toggleTheme((currentTheme) => {
      // если пользователь авторизован
      if (user) {
        // сохраняем тему для пользователя на сервере
        dispatch(saveJsonSettings({ theme: currentTheme }));
      }
    });
  }, [dispatch, toggleTheme, user]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Icon
          aria-label='theme toggle'
          clickable
          height={20}
          onClick={onToggleHandler}
          Svg={ThemeIcon}
          width={20}
        />
      }
      off={
        <Button
          aria-label='theme toggle'
          className={classNames('', {}, [className])}
          onClick={onToggleHandler}
          theme={ButtonTheme.CLEAR}
        >
          <IconDeprecated height={40} inverted Svg={ThemeIconDeprecated} width={40} />
        </Button>
      }
    />
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';
