import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from 'shared/ui/Button/Button';

import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter: FC = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const counterValue = useSelector(getCounterValue);

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  const increment = () => {
    dispatch(counterActions.increment());
  };

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>

      <Button data-testid='increment-btn' onClick={increment}>
        {t('Увеличить')}
      </Button>

      <Button data-testid='decrement-btn' onClick={decrement}>
        {t('Уменьшить')}
      </Button>
    </div>
  );
});

Counter.displayName = 'Counter';
