import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';

import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
            <ThemeSwitcher />

            <div className={classes.links}>
                <AppLink
                    className={classes.mainLink}
                    invertedTheme={AppLinkTheme.SECONDARY}
                    to="/"
                >
                    Главная
                </AppLink>

                <AppLink
                    invertedTheme={AppLinkTheme.RED}
                    to="/about"
                >
                    О сайте
                </AppLink>
            </div>
        </div>
    );
};
