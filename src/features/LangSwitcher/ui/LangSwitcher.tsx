import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Краткое название для языка
   */
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
          {short ? t('Короткий язык') : t('Язык')}
        </Button>
      }
      off={
        <ButtonDeprecated
          className={classNames('', {}, [className])}
          onClick={toggle}
          theme={ButtonTheme.CLEAR}
        >
          {short ? t('Короткий язык') : t('Язык')}
        </ButtonDeprecated>
      }
    />
  );
});

LangSwitcher.displayName = 'LangSwitcher';
