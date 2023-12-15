import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import classes from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <>
      <Link to='/'>Home</Link><br />
      <Link to='about'>About</Link><br />
      <Link to='shop'>Shop</Link>

      <h1 className={classes.title}>{count}</h1>

      <button className={classes.button} onClick={increment}>
        <span>+</span>
      </button>

      <Outlet />
    </>
  );
};
