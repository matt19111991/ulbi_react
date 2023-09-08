import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

import ThemeIcon from '@/shared/assets/icons/theme.svg';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const dispatch = useAppDispatch();
  const { toggleTheme } = useTheme();

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
      <Icon height={40} inverted Svg={ThemeIcon} width={40} />
    </Button>
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';
