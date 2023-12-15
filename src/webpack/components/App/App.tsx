import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import jpgImage from '@/assets/cat.jpg';
import pngImage from '@/assets/spot.png';

import Calendar from '@/assets/calendar.svg';

import classes from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <>
      <h1>Platform: {__PLATFORM__}</h1>

      <div>
        <img alt='' height={150} src={pngImage} width={300} />
        <img alt='' height={150} src={jpgImage} width={120} />
      </div>

      <div>
        <Calendar className={classes.icon} height={50} width={50} />
      </div>

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
