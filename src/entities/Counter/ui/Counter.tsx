import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';

import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = memo(() => {
  const dispatch = useAppDispatch();
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
