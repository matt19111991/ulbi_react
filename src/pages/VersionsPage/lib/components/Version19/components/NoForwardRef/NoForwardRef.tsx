import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './NoForwardRef.module.scss';

const InputWithForwardRef = forwardRef((props, ref) => {
  console.log('--- forwardRef props ---', props);
  console.log('--- forwardRef ref ---', ref);

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return <input ref={inputRef} />;
});

InputWithForwardRef.displayName = 'InputWithForwardRef';

interface InputNoForwardRef {
  ref: RefObject<Partial<HTMLButtonElement> | null>;
}

const InputNoForwardRef = (props: InputNoForwardRef) => {
  console.log('--- no forwardRef props ---', props);

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(props.ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return <input ref={inputRef} />;
};

export const NoForwardRef = () => {
  const { t } = useTranslation();

  const noForwardRef = useRef<HTMLButtonElement>(null);
  const withForwardRef = useRef<HTMLButtonElement>(null);

  return (
    <VStack align='start' gap='24'>
      <VStack align='start' gap='24'>
        <Text size='l' text='forwardRef' />

        <InputWithForwardRef ref={withForwardRef} />

        <Button onClick={() => withForwardRef.current?.focus()}>{t('Фокус')}</Button>
      </VStack>

      <VStack className={classes.separator} max>
        <hr />
      </VStack>

      <VStack align='start' gap='24'>
        <Text size='l' text='no forwardRef' />

        <InputNoForwardRef ref={noForwardRef} />

        <Button onClick={() => noForwardRef.current?.focus()}>{t('Фокус')}</Button>
      </VStack>
    </VStack>
  );
};
