import { useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';

import classes from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <div
            className={classNames(
                classes.Sidebar,
                { [classes.collapsed]: collapsed },
                [className],
            )}
        >
            <button onClick={onToggle}>toggle</button>

            <div className={classes.switchers}>
                <ThemeSwitcher />

                {/* <LangSwitcher /> */}
            </div>
        </div>
    );
};
