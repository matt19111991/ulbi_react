import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from '@/shared/lib/features';

import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth/useWindowWidth';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = memo(() => {
  const { t } = useTranslation();

  const { decrement, increment } = useCounterActions();

  const counterValue = String(useCounterValue());

  const windowWidth = useWindowWidth();

  const onDecrement = useCallback(() => {
    decrement();
  }, [decrement]);

  const onIncrement = useCallback(() => {
    increment();
  }, [increment]);

  const buttonSize = useMemo(() => (windowWidth < 840 ? 's' : 'm'), [windowWidth]);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <VStack align='start' gap='16'>
          <TextRedesigned data-testid='counter-value' title={counterValue} />

          <HStack gap='16' wrap='wrap'>
            <ButtonRedesigned
              color='success'
              data-testid='increment-btn'
              onClick={onIncrement}
              size={buttonSize}
            >
              {t('Увеличить')}
            </ButtonRedesigned>

            <ButtonRedesigned
              color='error'
              data-testid='decrement-btn'
              onClick={onDecrement}
              size={buttonSize}
            >
              {t('Уменьшить')}
            </ButtonRedesigned>
          </HStack>
        </VStack>
      }
      off={
        <VStack align='start' gap='16'>
          <TextDeprecated data-testid='counter-value' title={counterValue} />

          <HStack gap='16' wrap='wrap'>
            <ButtonDeprecated
              data-testid='increment-btn'
              onClick={onIncrement}
              theme={ButtonTheme.OUTLINE}
            >
              {t('Увеличить')}
            </ButtonDeprecated>

            <ButtonDeprecated
              data-testid='decrement-btn'
              onClick={onDecrement}
              theme={ButtonTheme.OUTLINE_RED}
            >
              {t('Уменьшить')}
            </ButtonDeprecated>
          </HStack>
        </VStack>
      }
    />
  );
});

Counter.displayName = 'Counter';
