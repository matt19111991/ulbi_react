import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<Icon clickable height={20} onClick={onToggleHandler} Svg={ThemeIcon} width={20} />}
      off={
        <Button
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
