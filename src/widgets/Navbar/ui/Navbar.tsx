import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(classes.Navbar, {}, [className])}>
    <div className={classes.links}>
      <AppLink
        className={classes.mainLink}
        invertedTheme={AppLinkTheme.SECONDARY}
        to='/'
      >
        Главная
      </AppLink>

      <AppLink
        invertedTheme={AppLinkTheme.RED}
        to='/about'
      >
        О сайте
      </AppLink>
    </div>
  </div>
);
