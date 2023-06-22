import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import classes from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { i18n, t } = useTranslation();

  const toggle = () => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      className={classNames(classes.LangSwitcher, {}, [className])}
      onClick={toggle}
      theme={ThemeButton.CLEAR}
    >
      {t('Язык')}
    </Button>
  );
};
