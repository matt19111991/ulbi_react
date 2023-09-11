import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { i18n, t } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Button className={classNames('', {}, [className])} onClick={toggle} variant='clear'>
          {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
      }
      off={
        <ButtonDeprecated
          className={classNames('', {}, [className])}
          onClick={toggle}
          theme={ButtonTheme.CLEAR}
        >
          {t(short ? 'Короткий язык' : 'Язык')}
        </ButtonDeprecated>
      }
    />
  );
});

LangSwitcher.displayName = 'LangSwitcher';
