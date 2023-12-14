import { useState } from 'react';

import classes from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <>
      <h1 className={classes.title}>{count}</h1>

      <button className={classes.button} onClick={increment}>
        <span>+</span>
      </button>
    </>
  );
};
