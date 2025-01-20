import { useCallback, useDeferredValue, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { SlowList } from '../SlowList/SlowList';

import classes from './UseDeferredValue.module.scss';

export const UseDeferredValue = () => {
  const [noDefState, setNoDefState] = useState('');
  const [defState, setDefState] = useState('');

  const deferredText = useDeferredValue(defState);

  const { t } = useTranslation();

  const isStale = defState !== deferredText;

  const onChangeDef = useCallback((value: string) => {
    setDefState(value);
  }, []);

  const onChangeNoDef = useCallback((value: string) => {
    setNoDefState(value);
  }, []);

  return (
    <VStack align='start' gap='24'>
      <VStack align='start'>
        <Text size='l' text={t('С отложенным значением')} />
        <Text size='m' text={t('Ввод в поле без задержек')} />

        <VStack align='start' className={classes.posts} gap='24'>
          <Input onChange={onChangeDef} value={defState} />

          <div className={classNames(classes.list, { [classes.stale]: isStale })}>
            <SlowList countable={false} text={deferredText} />
          </div>
        </VStack>
      </VStack>

      <VStack className={classes.separator} max>
        <hr />
      </VStack>

      <VStack align='start'>
        <Text size='l' text={t('Без отложенного значения')} />
        <Text size='m' text={t('Ввод в поле с задержкой')} />

        <VStack align='start' className={classes.posts} gap='24'>
          <Input onChange={onChangeNoDef} value={noDefState} />

          <SlowList countable={false} text={noDefState} />
        </VStack>
      </VStack>
    </VStack>
  );
};
