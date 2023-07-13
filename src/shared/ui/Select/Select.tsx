import { classNames, Mods } from 'shared/lib/classNames/classNames';

import classes from './Select.module.scss';

interface SelectProps {
  className?: string;
  label?: string;
}

export const Select = ({ className, label }: SelectProps) => {
  const mods: Mods = {

  };

  return (
    <div className={classNames(classes.Wrapper, mods, [className])}>
      {label && <span className={classes.label}>{`${label}>`}</span>}

      <select className={classes.select}>
        <option className={classes.option}>123</option>
        <option className={classes.option}>456</option>
        <option className={classes.option}>7890</option>
      </select>
    </div>
  );
};
