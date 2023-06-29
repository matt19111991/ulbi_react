import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(classes.Navbar, {}, [className])} />
);
