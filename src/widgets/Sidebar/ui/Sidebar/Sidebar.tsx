import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import { classNames } from 'shared/lib/classNames/classNames';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';

import classes from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
      setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={classNames(
        classes.Sidebar,
        { [classes.collapsed]: collapsed },
        [className],
      )}
      data-testid='sidebar'
    >
      <Button
        className={classes.collapseBtn}
        data-testid='sidebar-toggle'
        onClick={onToggle}
        size={ButtonSize.L}
        square
        theme={ButtonTheme.BACKGROUND_INVERTED}
      >
        {collapsed ? '>' : '<'}
      </Button>

      <div className={classes.items}>
        <AppLink
          className={classes.item}
          invertedTheme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
        >
          <MainIcon className={classes.icon} />
          <span className={classes.link}>{t('Главная')}</span>
        </AppLink>

        <AppLink
          className={classes.item}
          invertedTheme={AppLinkTheme.SECONDARY}
          to={RoutePath.about}
        >
          <AboutIcon className={classes.icon} />
          <span className={classes.link}>{t('О сайте')}</span>
        </AppLink>
      </div>

      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={classes.lng} short={collapsed} />
      </div>
    </div>
  );
};
