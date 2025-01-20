import { useState } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const AsyncAutoBatching = () => {
  console.count('---render---');

  const { t } = useTranslation();

  const [count, setCount] = useState(0);
  const [, setData] = useState([]);
  const [, setIsError] = useState(false);
  const [, setIsLoading] = useState(false);

  const onDecreaseCount = () => {
    setCount(count - 1);
  };

  const onIncreaseCount = () => {
    setCount(count + 1);
  };

  const onFlushSync = () => {
    // отменяем батчинг: 3 изменения состояния и 3 ререндера

    flushSync(() => {
      setCount((prev) => prev + 1);
    });

    flushSync(() => {
      setCount((prev) => prev + 1);
    });

    flushSync(() => {
      setCount((prev) => prev + 1);
    });
  };

  const onIdenticalStates = () => {
    // батчинг: 3 изменения состояния и всего 1 ререндер

    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const onFetch = () => {
    /*
      батчинг с промисами:
        - 'React v.17': 3 изменения состояния и 3 ререндера
        - 'React v.18': 3 изменения состояния и всего 1 ререндер
    */

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        setIsLoading(false);

        setIsError(false);
      });
  };

  const onSetTimeout = () => {
    /*
      батчинг с таймерами:
        - 'React v.17': 3 изменения состояния и 3 ререндера
        - 'React v.18': 3 изменения состояния и всего 1 ререндер
   */

    setTimeout(() => {
      setCount(count + 1);

      setIsLoading(true);

      setIsError(true);
    }, 1000);
  };

  return (
    <VStack align='start' gap='24'>
      <HStack gap='24'>
        <Button color='error' onClick={onDecreaseCount}>
          -
        </Button>

        <Button color='success' onClick={onIncreaseCount}>
          +
        </Button>

        <Text text={count.toString()} />
      </HStack>

      <HStack gap='24'>
        <Button onClick={onSetTimeout}>{t('Таймер')}</Button>

        <Button onClick={onFetch}>{t('Промис')}</Button>
      </HStack>

      <VStack align='start' gap='24'>
        <Button onClick={onIdenticalStates}>{t('Одинаковые состояния')}</Button>

        <Button color='error' onClick={onFlushSync}>
          {t('Без автобатчинга')}
        </Button>
      </VStack>
    </VStack>
  );
};
