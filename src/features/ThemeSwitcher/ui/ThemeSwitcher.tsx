import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';

import { Theme } from '@/shared/const/theme';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Button, ButtonTheme } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useTheme();

  const onToggleHandler = useCallback(() => {
    toggleTheme((currentTheme) => {
      // сохраняем тему для пользователя на сервере
      dispatch(saveJsonSettings({ theme: currentTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <Button
      className={classNames('', {}, [className])}
      onClick={onToggleHandler}
      theme={ButtonTheme.CLEAR}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';
