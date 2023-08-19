import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = memo(() => {
  const { t } = useTranslation();

  const { decrement, increment } = useCounterActions();

  const counterValue = useCounterValue();

  const onDecrementHandler = () => {
    decrement();
  };

  const onIncrementHandler = () => {
    increment();
  };

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>

      <Button data-testid='increment-btn' onClick={onIncrementHandler}>
        {t('Увеличить')}
      </Button>

      <Button data-testid='decrement-btn' onClick={onDecrementHandler}>
        {t('Уменьшить')}
      </Button>
    </div>
  );
});

Counter.displayName = 'Counter';
